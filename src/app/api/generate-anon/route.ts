import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";
import { generateSlug } from "@/lib/slugify";
import type { IdeaJson } from "@/types";

function checkEnv(): string | null {
  if (!process.env.OPENAI_API_KEY) return "OpenAI (add OPENAI_API_KEY in Vercel)";
  return null;
}

/**
 * Ensure an anonymous user record exists for the given anonymous ID.
 * Creates a placeholder user with a synthetic email if none exists.
 */
async function ensureAnonUser(anonId: string): Promise<{ id: string } | null> {
  const db = supabaseServer();

  // Try to find existing anonymous user
  const { data: existing } = await db
    .from("users")
    .select("id")
    .eq("anonymous_id", anonId)
    .maybeSingle();

  if (existing?.id) return { id: existing.id };

  // Create new anonymous user with placeholder email
  const placeholderEmail = `anon-${anonId}@anon.local`;
  const { data: inserted, error: insErr } = await db
    .from("users")
    .insert({
      email: placeholderEmail,
      anonymous_id: anonId,
      email_frequency: "weekly",
      profile_json: {},
    })
    .select("id")
    .single();

  if (insErr || !inserted) {
    // Race condition: another request may have created it
    if (insErr && typeof insErr === "object" && "code" in insErr && String((insErr as { code?: string }).code) === "23505") {
      const { data: again } = await db
        .from("users")
        .select("id")
        .eq("anonymous_id", anonId)
        .maybeSingle();
      if (again?.id) return { id: again.id };
    }
    console.error("ensureAnonUser: insert failed", insErr);
    return null;
  }

  // Create default free plan for the anonymous user
  await db.from("user_plans").insert({ user_id: inserted.id, plan_type: "free" });

  return { id: inserted.id };
}

/**
 * Anonymous idea generation — generates 5 ideas, stores them in DB,
 * and associates them with an anonymous user record for later claiming.
 * Client-side localStorage tracks that only 1 batch is allowed.
 */
export async function POST(req: Request) {
  try {
    const envError = checkEnv();
    if (envError) {
      return NextResponse.json({ error: `Server not configured: ${envError}` }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const context = typeof body.context === "string" ? body.context.trim() : "";
    const anonId = typeof body.anonId === "string" ? body.anonId.trim() : "";
    const summary = context || "general audience";

    if (!anonId) {
      return NextResponse.json({ error: "Missing anonymous ID" }, { status: 400 });
    }

    // Ensure anonymous user record exists
    const anonUser = await ensureAnonUser(anonId);
    if (!anonUser) {
      return NextResponse.json({ error: "Failed to create anonymous user" }, { status: 500 });
    }

    const { ideas, usage } = await generateIdeas(summary, 5);
    await logRequest({
      userId: anonUser.id,
      kind: "generate_anon",
      model: process.env.OPENAI_MODEL_FAST,
      tokensIn: usage.prompt,
      tokensOut: usage.completion,
      costEst: usage.costEst,
    });

    const db = supabaseServer();
    const today = new Date().toISOString().slice(0, 10);

    // Create idea batch
    const { data: batch, error: batchError } = await db
      .from("idea_batches")
      .insert({ user_id: anonUser.id, scheduled_for_date: today })
      .select("id")
      .single();

    if (batchError || !batch) {
      console.error("generate-anon: batch insert", batchError);
      return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });
    }

    // Insert ideas
    const ideaRows = ideas.map((ideaJson) => ({
      batch_id: batch.id,
      user_id: anonUser.id,
      idea_json: ideaJson,
      is_public: true,
    }));

    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) {
      console.error("generate-anon: ideas insert", ideasError);
      return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });
    }

    // Generate slugs for each idea
    const { data: saved } = await db
      .from("ideas")
      .select("id, idea_json")
      .eq("batch_id", batch.id)
      .order("created_at");

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
    });
  } catch (e) {
    console.error("generate-anon", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
