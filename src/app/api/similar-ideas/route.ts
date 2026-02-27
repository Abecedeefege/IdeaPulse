import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateIdeas, logRequest } from "@/lib/openai";
import { similarIdeasSchema } from "@/lib/validation";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

const EXAMPLE_COOKIE_NAME = "example_ideas_count";
const FREE_QUOTA_LIMIT = 1000;

function checkEnv(): string | null {
  if (!process.env.OPENAI_API_KEY) return "OpenAI (add OPENAI_API_KEY in Vercel)";
  return null;
}

export async function POST(req: Request) {
  try {
    const envError = checkEnv();
    if (envError) {
      return NextResponse.json({ error: `Server not configured: ${envError}` }, { status: 503 });
    }

    const cookieStore = await cookies();
    const current = parseInt(cookieStore.get(EXAMPLE_COOKIE_NAME)?.value ?? "0", 10) || 0;
    if (current >= FREE_QUOTA_LIMIT) {
      return NextResponse.json({ error: "You've used your free ideas. Sign up or log in to get more." }, { status: 403 });
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
      kind: "similar_ideas",
      model: process.env.OPENAI_MODEL_FAST,
      tokensIn: usage.prompt,
      tokensOut: usage.completion,
      costEst: usage.costEst,
    });

    let savedIds: string[] = [];

    const authUser = await getServerUser();
    if (authUser) {
      try {
        const db = supabaseServer();
        const { data: appUser } = await db.from("users").select("id, profile_json").eq("email", authUser.email).single();
        if (appUser) {
          const profile = (appUser.profile_json as { plan?: string }) ?? {};
          const isPaid = profile.plan === "pro" || profile.plan === "team";
          const today = new Date().toISOString().slice(0, 10);

          const { data: batch } = await db.from("idea_batches")
            .insert({ user_id: appUser.id, scheduled_for_date: today })
            .select("id").single();

          if (batch) {
            const ideaRows = ideas.map((ideaJson) => ({
              batch_id: batch.id,
              user_id: appUser.id,
              idea_json: ideaJson,
              is_public: !isPaid,
            }));
            await db.from("ideas").insert(ideaRows);

            const { data: saved } = await db.from("ideas")
              .select("id")
              .eq("batch_id", batch.id)
              .order("created_at");
            savedIds = (saved ?? []).map((r) => r.id);
          }
        }
      } catch (e) {
        console.error("similar-ideas: failed to save for user", e);
      }
    }

    const ideasWithIds = ideas.map((idea, i) => ({
      ...idea,
      _savedId: savedIds[i] || null,
    }));

    const res = NextResponse.json({ ok: true, ideas: ideasWithIds });
    res.cookies.set(EXAMPLE_COOKIE_NAME, String(current + 1), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  } catch (e) {
    console.error("similar-ideas", e);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
