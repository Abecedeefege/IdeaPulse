import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import IdeaQuickActions from "@/components/IdeaQuickActions";
import GetSimilarIdeas from "@/components/GetSimilarIdeas";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const db = supabaseServer();
    const { data } = await db.from("ideas").select("idea_json").eq("id", id).single();
    if (!data) return { title: "Idea | IdeaPulse" };
    const j = data.idea_json as Record<string, unknown>;
    const title = String(j.title ?? "Idea");
    const hook = String(j.one_sentence_hook ?? "");
    return {
      title: `${title} | IdeaPulse`,
      description: hook,
      openGraph: { title, description: hook },
    };
  } catch {
    return { title: "Idea | IdeaPulse" };
  }
}

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
  const title = String(j.title ?? "Idea");
  const hook = String(j.one_sentence_hook ?? "");
  const shareText = String(j.share_text_tweet_sized ?? "");
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="text-xs font-medium text-violet-400 bg-violet-500/10 px-2 py-1 rounded">
          Your idea
        </span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
      <p className="text-zinc-400 text-lg mb-4">{hook}</p>
      <p className="text-zinc-300 mb-4">{String(j.why_it_could_work ?? "")}</p>
      <p className="text-sm text-zinc-500 mb-2">Difficulty: {String(j.difficulty_1_to_5 ?? "—")}/5</p>
      <p className="mb-2"><strong className="text-zinc-300">First step:</strong> <span className="text-zinc-400">{String(j.first_step_under_30min ?? "")}</span></p>
      <p className="mb-4"><strong className="text-zinc-300">Validate:</strong> <span className="text-zinc-400">{String(j.validate_question ?? "")}</span></p>
      <p className="text-sm text-zinc-500">Share: {shareText}</p>
      <IdeaQuickActions
        title={title}
        oneSentenceHook={hook}
        whyItCouldWork={String(j.why_it_could_work ?? "")}
        firstStepUnder30min={String(j.first_step_under_30min ?? "")}
        shareText={shareText}
        ideaUrl={ideaUrl}
      />
      <GetSimilarIdeas seedIdea={j as Record<string, unknown>} />
      <div className="mt-8 pt-6 border-t border-zinc-800">
        <Link href="/ideas" className="text-violet-400 hover:text-violet-300 font-medium">
          ← Back to Your ideas
        </Link>
      </div>
    </div>
  );
}
