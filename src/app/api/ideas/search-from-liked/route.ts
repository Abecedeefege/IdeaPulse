import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";

export async function POST() {
  try {
    const authUser = await getServerUser();
    if (!authUser) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const db = supabaseServer();
    const { data: appUser, error: userError } = await db
      .from("users")
      .select("id, email")
      .eq("id", authUser.id)
      .single();

    if (userError || !appUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data: liked } = await db
      .from("interactions")
      .select("idea_id")
      .eq("user_id", appUser.id)
      .eq("type", "like");

    const likedIds = [...new Set((liked ?? []).map((r) => r.idea_id))];
    if (likedIds.length === 0) {
      return NextResponse.json({ error: "No liked ideas yet." }, { status: 400 });
    }

    const { data: ideas } = await db
      .from("ideas")
      .select("id, idea_json")
      .in("id", likedIds)
      .order("created_at", { ascending: false })
      .limit(20);

    const summaries =
      ideas?.map((idea) => {
        const j = idea.idea_json as Record<string, unknown>;
        const title = String(j.title ?? "");
        const hook = String(j.one_sentence_hook ?? "");
        const why = String((j as { why_it_could_work?: string }).why_it_could_work ?? "");
        return [title, hook, why].filter(Boolean).join(". ");
      }) ?? [];

    if (summaries.length === 0) {
      return NextResponse.json({ error: "No liked ideas found to use as context." }, { status: 400 });
    }

    const context = summaries.join(" | ");
    const prompt = `Based on these liked ideas, generate 10 new business ideas that match their audience and style but explore fresh angles: ${context}`;

    const { ideas: newIdeas, usage } = await generateIdeas(prompt, 10);

    await logRequest({
      userId: appUser.id,
      kind: "search_from_liked",
      model: process.env.OPENAI_MODEL_FAST,
      tokensIn: usage.prompt,
      tokensOut: usage.completion,
      costEst: usage.costEst,
    });

    const today = new Date().toISOString().slice(0, 10);
    const { data: batch, error: batchError } = await db
      .from("idea_batches")
      .insert({ user_id: appUser.id, scheduled_for_date: today })
      .select("id")
      .single();

    if (batchError || !batch) {
      return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });
    }

    const ideaRows = newIdeas.map((ideaJson) => ({
      batch_id: batch.id,
      user_id: appUser.id,
      idea_json: ideaJson,
      is_public: true,
    }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) {
      return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, batchId: batch.id });
  } catch (e) {
    console.error("search-from-liked", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

