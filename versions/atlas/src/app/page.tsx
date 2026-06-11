import Link from "next/link";
import { categories } from "@/data/categories";
import { allIdeas, ideaNumber, ideasByCategory } from "@/data/ideas";
import { IdeaCard } from "@/components/IdeaCard";
import { IdeaOfTheDay } from "@/components/IdeaOfTheDay";

const featuredSlugs = [
  "health-score-sentinel",
  "trades-phone-agent",
  "city-hall-intel",
  "obsolete-parts-foundry",
  "fractional-cfo-guild",
  "flaky-test-warden",
];

export default function HomePage() {
  const featured = allIdeas.filter((i) => featuredSlugs.includes(i.slug));

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
          An IdeaPulse edition · {allIdeas.length} entries
        </p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] text-zinc-50 sm:text-6xl">
          The field guide to your{" "}
          <span className="italic text-violet-300">next business</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Ninety hand-curated business ideas, each with an honest mini-analysis:
          the market, the money, the first steps, and the risks nobody puts in
          the pitch. No fluff, no &ldquo;start a blog.&rdquo;
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/ideas/"
            className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
          >
            Browse all {allIdeas.length} ideas
          </Link>
          <Link
            href="/collections/"
            className="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-violet-500/50 hover:text-violet-200"
          >
            Curated collections
          </Link>
        </div>
      </section>

      {/* Idea of the day */}
      <section className="py-14">
        <IdeaOfTheDay />
      </section>

      {/* Categories */}
      <section className="border-t border-zinc-800 py-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl text-zinc-100">
            Ten territories
          </h2>
          <p className="hidden text-sm text-zinc-500 sm:block">
            Nine ideas mapped in each
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}/`}
              className="group rounded-2xl border border-white/10 bg-zinc-900/40 p-5 transition-all hover:border-violet-500/40 hover:bg-zinc-900/70"
            >
              <span className="font-display text-2xl text-violet-400" aria-hidden="true">
                {cat.icon}
              </span>
              <h3 className="font-display mt-3 text-lg text-zinc-100 transition-colors group-hover:text-violet-200">
                {cat.name}
              </h3>
              <p className="tabular mt-1 text-xs text-zinc-500">
                {ideasByCategory(cat.slug).length} ideas
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-zinc-800 py-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl text-zinc-100">
            From the atlas
          </h2>
          <Link
            href="/ideas/"
            className="text-sm text-violet-300 transition-colors hover:text-violet-200"
          >
            See everything →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} number={ideaNumber(idea.slug)} />
          ))}
        </div>
      </section>
    </div>
  );
}
