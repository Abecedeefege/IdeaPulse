import { supabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let idea: { id: string; idea_json: unknown; is_public: boolean } | null = null;
  try {
    const db = supabaseServer();
    const { data } = await db.from("ideas").select("id, idea_json, is_public").eq("id", id).single();
    idea = data;
  } catch {
    // Supabase not configured or error
  }
  if (!idea) notFound();
  const j = idea.idea_json as Record<string, unknown>;
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{String(j.title ?? "Idea")}</h1>
      <p className="text-gray-600 mb-4">{String(j.one_sentence_hook ?? "")}</p>
      <p className="mb-4">{String(j.why_it_could_work ?? "")}</p>
      <p className="text-sm text-gray-500 mb-2">Difficulty: {String(j.difficulty_1_to_5 ?? "—")}/5</p>
      <p className="mb-2"><strong>First step:</strong> {String(j.first_step_under_30min ?? "")}</p>
      <p className="mb-4"><strong>Validate:</strong> {String(j.validate_question ?? "")}</p>
      <p className="text-sm text-gray-500">Share: {String(j.share_text_tweet_sized ?? "")}</p>
    </div>
  );
}
