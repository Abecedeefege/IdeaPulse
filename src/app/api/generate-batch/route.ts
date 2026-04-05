import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";
import { profileUpdateSchema } from "@/lib/validation";
import { generateSlug } from "@/lib/slugify";
import { getUserPlan, isPremium } from "@/lib/user-plan";
import type { IdeaJson } from "@/types";

export async function POST(req: Request) {
  try {
    const authUser = await getServerUser();
    if (!authUser) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = profileUpdateSchema.safeParse(body);
    const profile = parsed.success && parsed.data.profile ? parsed.data.profile : {};

    const db = supabaseServer();
    const { data: appUser, error: userError } = await db
      .from("users")
      .select("id, email, profile_json, idea_profile")
      .eq("id", authUser.id)
      .single();
    if (userError || !appUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Tier-based rate limiting
    const userPlan = await getUserPlan(appUser.id);
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.UTC(
      parseInt(today.slice(0, 4), 10),
      parseInt(today.slice(5, 7), 10) - 1,
      parseInt(today.slice(8, 10), 10) + 1
    )).toISOString().slice(0, 10);

    if (userPlan.planType === "pack") {
      // Pack: deduct from lifetime credits
      if (userPlan.packCreditsRemaining < 5) {
        return NextResponse.json(
          { error: "Not enough credits. Purchase another pack.", redirect: "/pricing" },
          { status: 403 }
        );
      }
    } else {
      // Free/Subscriber: daily limit
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

    const profileJson = profile as { primary_goal?: string; constraints?: Record<string, string>; interests?: string[] };
    const summary = [profileJson.primary_goal, profileJson.constraints && typeof profileJson.constraints === "object" ? Object.values(profileJson.constraints).filter(Boolean).join(", ") : "", Array.isArray(profileJson.interests) ? profileJson.interests.join(", ") : ""].filter(Boolean).join(". ") || "general audience";

    const ideaProfile = (appUser as { idea_profile?: string }).idea_profile || undefined;
    const { ideas, usage } = await generateIdeas(summary, 5, ideaProfile);
    await logRequest({ userId: appUser.id, kind: "generate_ideas", model: process.env.OPENAI_MODEL_FAST, tokensIn: usage.prompt, tokensOut: usage.completion, costEst: usage.costEst });

    const { data: batch, error: batchError } = await db.from("idea_batches").insert({ user_id: appUser.id, scheduled_for_date: today }).select("id").single();
    if (batchError || !batch) return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });

    const ideaRows = ideas.map((ideaJson) => ({
      batch_id: batch.id,
      user_id: appUser.id,
      idea_json: ideaJson,
      is_public: !isPremium(userPlan.planType),
    }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });

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

    const { data: saved } = await db.from("ideas").select("id, idea_json").eq("batch_id", batch.id).order("created_at");
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
    console.error("generate-batch", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
