"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allIdeas, ideaNumber } from "@/data/ideas";
import { CapitalBadge, CategoryPill, DifficultyDots, IdeaNo } from "./badges";

export function IdeaOfTheDay() {
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    // Deterministic per-day pick; computed client-side after mount to avoid
    // any server/client hydration mismatch across date boundaries.
    const dayIndex = Math.floor(Date.now() / 86400000);
    setIdx((dayIndex * 37) % allIdeas.length);
  }, []);

  if (idx === null) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-8">
        <div className="animate-pulse-soft space-y-4">
          <div className="h-3 w-32 rounded bg-zinc-800" />
          <div className="h-7 w-3/4 rounded bg-zinc-800" />
          <div className="h-4 w-full rounded bg-zinc-800/70" />
          <div className="h-4 w-2/3 rounded bg-zinc-800/70" />
        </div>
      </div>
    );
  }

  const idea = allIdeas[idx];

  return (
    <Link
      href={`/ideas/${idea.slug}/`}
      className="group block rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 via-zinc-900/40 to-zinc-900/40 p-8 transition-all hover:border-violet-400/40"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
          Idea of the day
        </span>
        <IdeaNo n={ideaNumber(idea.slug)} className="text-sm" />
      </div>
      <h3 className="font-display mt-4 text-2xl text-zinc-50 transition-colors group-hover:text-violet-200 sm:text-3xl">
        {idea.title}
      </h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">{idea.hook}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <CategoryPill category={idea.category} />
        <DifficultyDots level={idea.difficulty} />
        <CapitalBadge capital={idea.capital} />
        <span className="text-xs text-zinc-500">
          First dollar: {idea.timeToFirstDollar}
        </span>
      </div>
    </Link>
  );
}
