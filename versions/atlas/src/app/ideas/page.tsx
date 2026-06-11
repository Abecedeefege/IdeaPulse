import type { Metadata } from "next";
import { allIdeas } from "@/data/ideas";
import { Explorer } from "@/components/Explorer";

export const metadata: Metadata = {
  title: "All Ideas",
  description: `Search and filter all ${allIdeas.length} business ideas in the atlas by category, difficulty, and starting capital.`,
};

export default function IdeasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
        The full index
      </p>
      <h1 className="font-display mt-3 text-4xl text-zinc-50 sm:text-5xl">
        All {allIdeas.length} ideas
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
        Every entry in the atlas — searchable by title, hook, and tags, and
        filterable by category, difficulty, and the capital it takes to start.
      </p>
      <div className="mt-10">
        <Explorer />
      </div>
    </div>
  );
}
