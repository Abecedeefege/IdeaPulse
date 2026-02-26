import { supabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";
import IdeaQuickActions from "@/components/IdeaQuickActions";
import GetSimilarIdeas from "@/components/GetSimilarIdeas";

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
  const base = process.env.NEXT_PUBLIC_APP_URL || "";
  const ideaUrl = base ? `${base}/idea/${id}` : undefined;
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">{String(j.title ?? "Idea")}</h1>
      <p className="text-zinc-400 mb-4">{String(j.one_sentence_hook ?? "")}</p>
      <p className="text-zinc-300 mb-4">{String(j.why_it_could_work ?? "")}</p>
      <p className="text-sm text-zinc-500 mb-2">Difficulty: {String(j.difficulty_1_to_5 ?? "—")}/5</p>
      <p className="mb-2"><strong className="text-zinc-300">First step:</strong> <span className="text-zinc-400">{String(j.first_step_under_30min ?? "")}</span></p>
      <p className="mb-4"><strong className="text-zinc-300">Validate:</strong> <span className="text-zinc-400">{String(j.validate_question ?? "")}</span></p>
      <p className="text-sm text-zinc-500">Share: {String(j.share_text_tweet_sized ?? "")}</p>
      <IdeaQuickActions
        title={String(j.title ?? "Idea")}
        oneSentenceHook={String(j.one_sentence_hook ?? "")}
        shareText={String(j.share_text_tweet_sized ?? "")}
        ideaUrl={ideaUrl}
      />
      <GetSimilarIdeas seedIdea={j as Record<string, unknown>} />
    </div>
  );
}
