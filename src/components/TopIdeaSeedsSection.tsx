import Link from "next/link";
import { curatedIdeas } from "@/data/curated-ideas";

const SEED_SLUGS = [
  "seed-ai-fully-autonomous",
  "seed-12k-in-90-days",
  "seed-solopreneur-ai-tools",
  "seed-household-ai-automation",
  "seed-ai-stripe-startups",
];

export function TopIdeaSeedsSection() {
  const seeds = SEED_SLUGS.map((slug) => curatedIdeas.find((c) => c.slug === slug)!).filter(Boolean);

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-2">Top Idea Seeds</h2>
      <p className="text-zinc-400 mb-8">Idea seeds are amazing starting points to ask IdeaPulse to recommend you similar ideas.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seeds.map((seed) => (
          <Link
            key={seed.slug}
            href={`/idea/curated/${seed.slug}`}
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-violet-500/40 hover:bg-zinc-900 transition-all duration-200"
          >
            <span className="self-start text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mb-3">
              Idea Seed
            </span>
            <h3 className="font-semibold text-white line-clamp-2 group-hover:text-violet-200 transition-colors">
              {seed.idea_json.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400 line-clamp-3">{seed.idea_json.one_sentence_hook}</p>
            <span className="mt-auto pt-3 inline-flex text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
              Explore seed →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
