import { NextResponse } from "next/server";
import { generateIdeas, logRequest } from "@/lib/openai";
import { similarIdeasSchema } from "@/lib/validation";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";
import { generateSlug } from "@/lib/slugify";
import { getUserPlan, isPremium } from "@/lib/user-plan";
import type { IdeaJson } from "@/types";

function checkEnv(): string | null {
  if (!process.env.OPENAI_API_KEY) return "OpenAI (add OPENAI_API_KEY in Vercel)";
  return null;
}

export async function POST(req: Request) {
  try {
    const authUser = await getServerUser();
    if (!authUser) {
      return NextResponse.json({ error: "Session unavailable. Refresh and try again." }, { status: 401 });
    }

    const envError = checkEnv();
    if (envError) {
      return NextResponse.json({ error: `Server not configured: ${envError}` }, { status: 503 });
    }

    const db = supabaseServer();
    const { data: appUser } = await db.from("users").select("id, profile_json, idea_profile").eq("id", authUser.id).single();
    if (!appUser) {
      return NextResponse.json({ error: "Session unavailable. Refresh and try again." }, { status: 401 });
    }

    // Tier-based rate limiting
    const userPlan = await getUserPlan(appUser.id);
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.UTC(
      parseInt(today.slice(0, 4), 10),
      parseInt(today.slice(5, 7), 10) - 1,
      parseInt(today.slice(8, 10), 10) + 1
    )).toISOString().slice(0, 10);

    if (userPlan.planType === "pack") {
      if (userPlan.packCreditsRemaining < 5) {
        return NextResponse.json(
          { error: "Not enough credits. Purchase another pack.", redirect: "/pricing" },
          { status: 403 }
        );
      }
    } else {
      const { count } = await db
        .from("ideas")
        .select("id", { count: "exact", head: true })
        .eq("user_id", appUser.id)
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lt("created_at", `${tomorrow}T00:00:00.000Z`);

      if (count != null && count >= userPlan.dailyIdeaLimit) {
        if (userPlan.planType === "free") {
          return NextResponse.json(
            { error: "Daily limit reached. Upgrade for more ideas.", redirect: "/pricing" },
            { status: 403 }
          );
        }
        return NextResponse.json(
          { error: "Daily limit reached. Try again tomorrow." },
          { status: 429 }
        );
      }
    }

    const body = await req.json().catch(() => ({}));
    const parsed = similarIdeasSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }

    let summary: string;
    if (parsed.data.seedIdea) {
      const s = parsed.data.seedIdea;
      summary = `Generate 5 ideas similar in theme and audience to this: ${[s.title, s.one_sentence_hook, s.why_it_could_work].filter(Boolean).join(". ")}`;
    } else {
      summary = parsed.data.context!.trim();
    }

    const ideaProfile = (appUser as { idea_profile?: string }).idea_profile || undefined;
    const { ideas, usage } = await generateIdeas(summary, 5, ideaProfile);

    await logRequest({
      userId: appUser.id,
      kind: "similar_ideas",
      model: process.env.OPENAI_MODEL_FAST,
      tokensIn: usage.prompt,
      tokensOut: usage.completion,
      costEst: usage.costEst,
    });

    const { data: batch, error: batchError } = await db
      .from("idea_batches")
      .insert({ user_id: appUser.id, scheduled_for_date: today })
      .select("id")
      .single();

    if (batchError || !batch) {
      console.error("similar-ideas: batch insert", batchError);
      return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });
    }

    const ideaRows = ideas.map((ideaJson) => ({
      batch_id: batch.id,
      user_id: appUser.id,
      idea_json: ideaJson,
      is_public: !isPremium(userPlan.planType),
    }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) {
      console.error("similar-ideas: ideas insert", ideasError);
      return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });
    }

    // Deduct pack credits after successful generation
    if (userPlan.planType === "pack") {
      await db
        .from("user_plans")
        .update({
          pack_credits_remaining: userPlan.packCreditsRemaining - 5,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", appUser.id);
    }

    const { data: saved } = await db
      .from("ideas")
      .select("id, idea_json")
      .eq("batch_id", batch.id)
      .order("created_at");
    const ideaIds = (saved ?? []).map((r) => r.id);

    // Generate slugs for each idea
    for (const row of saved ?? []) {
      const j = row.idea_json as Record<string, unknown>;
      const title = String(j.title ?? "idea");
      const slug = generateSlug(title, row.id);
      await db.from("ideas").update({ slug }).eq("id", row.id);
    }

    return NextResponse.json({
      ok: true,
      batchId: batch.id,
      ideas: ideas as IdeaJson[],
      ideaIds,
    });
  } catch (e) {
    console.error("similar-ideas", e);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
