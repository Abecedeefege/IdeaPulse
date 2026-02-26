import { notFound } from "next/navigation";
import Link from "next/link";
import { curatedIdeas } from "@/data/curated-ideas";
import IdeaQuickActions from "@/components/IdeaQuickActions";
import GetSimilarIdeas from "@/components/GetSimilarIdeas";

export default async function CuratedIdeaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const curated = curatedIdeas.find((c) => c.slug === slug);
  if (!curated) notFound();

  const j = curated.idea_json;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="text-xs font-medium text-violet-400 bg-violet-500/10 px-2 py-1 rounded">
          {curated.category}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">{j.title}</h1>
      <p className="text-zinc-400 text-lg mb-4">{j.one_sentence_hook}</p>
      <p className="text-zinc-300 mb-4">{j.why_it_could_work}</p>
      <p className="text-sm text-zinc-500 mb-2">Difficulty: {j.difficulty_1_to_5}/5</p>
      <p className="mb-2"><strong className="text-zinc-300">First step:</strong> <span className="text-zinc-400">{j.first_step_under_30min}</span></p>
      <p className="mb-4"><strong className="text-zinc-300">Validate:</strong> <span className="text-zinc-400">{j.validate_question}</span></p>
      <p className="text-sm text-zinc-500">Share: {j.share_text_tweet_sized}</p>
      <IdeaQuickActions
        title={j.title}
        oneSentenceHook={j.one_sentence_hook}
        whyItCouldWork={j.why_it_could_work}
        firstStepUnder30min={j.first_step_under_30min}
        shareText={j.share_text_tweet_sized}
      />
      <GetSimilarIdeas seedIdea={j} />
      <div className="mt-8 pt-6 border-t border-zinc-800">
        <Link href="/top-ideas" className="text-violet-400 hover:text-violet-300 font-medium">
          ← Back to Top Ideas
        </Link>
      </div>
    </div>
  );
}
