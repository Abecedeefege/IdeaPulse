import { NextResponse } from "next/server";
import { generateIdeas, logRequest } from "@/lib/openai";
import { similarIdeasSchema } from "@/lib/validation";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

const SIMILAR_IDEAS_DAILY_LIMIT = 10;

function checkEnv(): string | null {
  if (!process.env.OPENAI_API_KEY) return "OpenAI (add OPENAI_API_KEY in Vercel)";
  return null;
}

export async function POST(req: Request) {
  try {
    const authUser = await getServerUser();
    if (!authUser) {
      return NextResponse.json({ error: "Sign in to get similar ideas." }, { status: 401 });
    }

    const envError = checkEnv();
    if (envError) {
      return NextResponse.json({ error: `Server not configured: ${envError}` }, { status: 503 });
    }

    const db = supabaseServer();
    const { data: appUser } = await db.from("users").select("id, profile_json").eq("email", authUser.email).single();
    if (!appUser) {
      return NextResponse.json({ error: "Sign in to get similar ideas." }, { status: 401 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.UTC(
      parseInt(today.slice(0, 4), 10),
      parseInt(today.slice(5, 7), 10) - 1,
      parseInt(today.slice(8, 10), 10) + 1
    )).toISOString().slice(0, 10);
    const { count } = await db
      .from("request_logs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", appUser.id)
      .eq("kind", "similar_ideas")
      .gte("created_at", `${today}T00:00:00.000Z`)
      .lt("created_at", `${tomorrow}T00:00:00.000Z`);
    if (count != null && count >= SIMILAR_IDEAS_DAILY_LIMIT) {
      return NextResponse.json(
        { error: "You've used your free ideas for today. Upgrade or try again tomorrow." },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = similarIdeasSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }

    let summary: string;
    if (parsed.data.seedIdea) {
      const s = parsed.data.seedIdea;
      summary = `Generate 10 ideas similar in theme and audience to this: ${[s.title, s.one_sentence_hook, s.why_it_could_work].filter(Boolean).join(". ")}`;
    } else {
      summary = parsed.data.context!.trim();
    }

    const { ideas, usage } = await generateIdeas(summary, 10);

    await logRequest({
      userId: appUser.id,
      kind: "similar_ideas",
      model: process.env.OPENAI_MODEL_FAST,
      tokensIn: usage.prompt,
      tokensOut: usage.completion,
      costEst: usage.costEst,
    });

    let savedIds: string[] = [];
    try {
      const profile = (appUser.profile_json as { plan?: string }) ?? {};
      const isPaid = profile.plan === "pro" || profile.plan === "team";

      const { data: batch } = await db
        .from("idea_batches")
        .insert({ user_id: appUser.id, scheduled_for_date: today })
        .select("id")
        .single();

      if (batch) {
        const ideaRows = ideas.map((ideaJson) => ({
          batch_id: batch.id,
          user_id: appUser.id,
          idea_json: ideaJson,
          is_public: !isPaid,
        }));
        await db.from("ideas").insert(ideaRows);

        const { data: saved } = await db
          .from("ideas")
          .select("id")
          .eq("batch_id", batch.id)
          .order("created_at");
        savedIds = (saved ?? []).map((r) => r.id);
      }
    } catch (e) {
      console.error("similar-ideas: failed to save for user", e);
    }

    const ideasWithIds = ideas.map((idea, i) => ({
      ...idea,
      _savedId: savedIds[i] || null,
    }));

    return NextResponse.json({ ok: true, ideas: ideasWithIds });
  } catch (e) {
    console.error("similar-ideas", e);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
