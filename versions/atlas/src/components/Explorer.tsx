"use client";

import { useMemo, useState } from "react";
import type { AtlasIdea, CategorySlug } from "@/data/types";
import { allIdeas, ideaNumber } from "@/data/ideas";
import { categories } from "@/data/categories";
import { IdeaCard } from "./IdeaCard";

type CapitalFilter = "all" | AtlasIdea["capital"];
type DifficultyFilter = "all" | "1" | "2" | "3" | "4" | "5";
type CategoryFilter = "all" | CategorySlug;

const capitalOptions: { value: CapitalFilter; label: string }[] = [
  { value: "all", label: "Any capital" },
  { value: "under-500", label: "Under $500" },
  { value: "500-5k", label: "$500–5K" },
  { value: "5k-plus", label: "$5K+" },
];

export function Explorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [capital, setCapital] = useState<CapitalFilter>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allIdeas.filter((idea) => {
      if (category !== "all" && idea.category !== category) return false;
      if (difficulty !== "all" && idea.difficulty !== Number(difficulty)) return false;
      if (capital !== "all" && idea.capital !== capital) return false;
      if (q.length > 0) {
        const haystack = `${idea.title} ${idea.hook} ${idea.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, difficulty, capital]);

  const selectClass =
    "rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none transition-colors focus:border-violet-500";

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, hooks, tags…"
          className="w-full flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-violet-500"
          aria-label="Search ideas"
        />
        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryFilter)}
            className={selectClass}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyFilter)}
            className={selectClass}
            aria-label="Filter by difficulty"
          >
            <option value="all">Any difficulty</option>
            {["1", "2", "3", "4", "5"].map((d) => (
              <option key={d} value={d}>
                Difficulty {d}/5
              </option>
            ))}
          </select>
          <select
            value={capital}
            onChange={(e) => setCapital(e.target.value as CapitalFilter)}
            className={selectClass}
            aria-label="Filter by starting capital"
          >
            {capitalOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="tabular mt-6 text-sm text-zinc-500">
        {results.length} of {allIdeas.length} ideas
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 p-12 text-center">
          <p className="font-display text-xl text-zinc-300">Nothing in the atlas matches.</p>
          <p className="mt-2 text-sm text-zinc-500">
            Try a broader search, or clear a filter or two.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} number={ideaNumber(idea.slug)} />
          ))}
        </div>
      )}
    </div>
  );
}
