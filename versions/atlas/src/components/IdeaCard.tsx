import Link from "next/link";
import type { AtlasIdea } from "@/data/types";
import { CapitalBadge, CategoryPill, DifficultyDots, IdeaNo } from "./badges";

export function IdeaCard({ idea, number }: { idea: AtlasIdea; number: number }) {
  return (
    <Link
      href={`/ideas/${idea.slug}/`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition-all hover:border-violet-500/40 hover:bg-zinc-900/70"
    >
      <div className="flex items-center justify-between">
        <IdeaNo n={number} className="text-sm" />
        <CategoryPill category={idea.category} />
      </div>
      <h3 className="font-display mt-4 text-xl leading-snug text-zinc-100 transition-colors group-hover:text-violet-200">
        {idea.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
        {idea.hook}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
        <DifficultyDots level={idea.difficulty} />
        <CapitalBadge capital={idea.capital} />
      </div>
    </Link>
  );
}
