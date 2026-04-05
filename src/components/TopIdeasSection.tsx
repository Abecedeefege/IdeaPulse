import Link from "next/link";
import { curatedIdeas } from "@/data/curated-ideas";

const TOP_IDEA_SLUGS = [
  "ai-meal-planner-shops-for-you",
  "ai-home-maintenance-concierge",
  "fully-autonomous-ai-newsletter",
  "ai-personal-finance-autopilot",
  "ai-micro-saas-factory",
];

export function TopIdeasSection() {
  const ideas = TOP_IDEA_SLUGS.map((slug) => curatedIdeas.find((c) => c.slug === slug)!).filter(Boolean);

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-2">Top Ideas</h2>
      <p className="text-zinc-400 mb-8">Hand-picked ideas the community keeps coming back to.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <Link
            key={idea.slug}
            href={`/idea/curated/${idea.slug}`}
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-violet-500/40 hover:bg-zinc-900 transition-all duration-200"
          >
            <span className="self-start text-xs font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded mb-3">
              {idea.category}
            </span>
            <h3 className="font-semibold text-white line-clamp-2 group-hover:text-violet-200 transition-colors">
              {idea.idea_json.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400 line-clamp-3">{idea.idea_json.one_sentence_hook}</p>
            <span className="mt-auto pt-3 inline-flex text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
              Explore idea →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
