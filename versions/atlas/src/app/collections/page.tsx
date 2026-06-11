import type { Metadata } from "next";
import Link from "next/link";
import { collections } from "@/data/collections";
import { getIdeaBySlug, ideaNumber } from "@/data/ideas";
import { CapitalBadge, CategoryPill, DifficultyDots, IdeaNo } from "@/components/badges";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Five curated reading paths through the atlas: weekend-buildable ideas, under-$500 starts, AI-native plays, boring-but-profitable niches, and audience-first businesses.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
        Curated paths
      </p>
      <h1 className="font-display mt-3 text-4xl text-zinc-50 sm:text-5xl">
        Collections
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
        Five editorial routes through the atlas, for when you know the shape of
        what you want before you know the idea.
      </p>

      <div className="mt-12 space-y-16">
        {collections.map((collection) => {
          const ideas = collection.ideaSlugs
            .map((slug) => getIdeaBySlug(slug))
            .filter((idea) => idea !== undefined);
          return (
            <section key={collection.slug} id={collection.slug}>
              <h2 className="font-display text-3xl text-zinc-100">
                {collection.title}
              </h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-zinc-400">
                {collection.blurb}
              </p>
              <ul className="mt-6 divide-y divide-zinc-800 rounded-2xl border border-white/10 bg-zinc-900/40">
                {ideas.map((idea) => (
                  <li key={idea.slug}>
                    <Link
                      href={`/ideas/${idea.slug}/`}
                      className="group flex flex-col gap-2 p-5 transition-colors hover:bg-zinc-900/80 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="flex items-baseline gap-4">
                        <IdeaNo n={ideaNumber(idea.slug)} className="text-sm" />
                        <span>
                          <span className="font-display block text-lg text-zinc-100 transition-colors group-hover:text-violet-200">
                            {idea.title}
                          </span>
                          <span className="mt-0.5 block text-sm text-zinc-500">
                            {idea.hook}
                          </span>
                        </span>
                      </span>
                      <span className="flex flex-none items-center gap-3 pl-12 sm:pl-4">
                        <CategoryPill category={idea.category} />
                        <DifficultyDots level={idea.difficulty} />
                        <CapitalBadge capital={idea.capital} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
