import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allIdeas, getIdeaBySlug, ideaNumber, ideasByCategory } from "@/data/ideas";
import { getCategoryBySlug } from "@/data/categories";
import { CapitalBadge, CategoryPill, DifficultyDots, IdeaNo } from "@/components/badges";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allIdeas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);
  if (!idea) return {};
  return {
    title: idea.title,
    description: idea.summary,
    openGraph: {
      title: idea.title,
      description: idea.summary,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: idea.title,
      description: idea.summary,
    },
  };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-zinc-800 py-8">
      <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
        {label}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function IdeaPage({ params }: Props) {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);
  if (!idea) notFound();

  const category = getCategoryBySlug(idea.category);
  const siblings = ideasByCategory(idea.category);
  const i = siblings.findIndex((s) => s.slug === idea.slug);
  const prev = siblings[(i - 1 + siblings.length) % siblings.length];
  const next = siblings[(i + 1) % siblings.length];
  const more = siblings.filter((s) => s.slug !== idea.slug).slice(0, 4);

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      {/* Editorial header */}
      <header>
        <div className="flex flex-wrap items-center gap-4">
          <IdeaNo n={ideaNumber(idea.slug)} className="text-lg" />
          <CategoryPill category={idea.category} asLink />
        </div>
        <h1 className="font-display mt-5 text-4xl leading-[1.1] text-zinc-50 sm:text-5xl">
          {idea.title}
        </h1>
        <p className="font-display mt-5 text-xl italic leading-relaxed text-zinc-300">
          {idea.hook}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-zinc-400">
          <span className="flex items-center gap-2">
            <DifficultyDots level={idea.difficulty} />
            <span className="text-xs">difficulty</span>
          </span>
          <CapitalBadge capital={idea.capital} />
          <span className="text-xs text-zinc-500">
            First dollar: <span className="text-zinc-300">{idea.timeToFirstDollar}</span>
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[11px] text-zinc-500"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-l-2 border-violet-500/60 pl-5 leading-relaxed text-zinc-300">
          {idea.summary}
        </p>
      </header>

      {/* Analysis */}
      <div className="mt-12">
        <Section label="Market">
          <p className="leading-relaxed text-zinc-300">{idea.analysis.market}</p>
        </Section>

        <Section label="Monetization">
          <p className="leading-relaxed text-zinc-300">{idea.analysis.monetization}</p>
        </Section>

        <Section label="First steps">
          <ol className="space-y-4">
            {idea.analysis.firstSteps.map((step, n) => (
              <li key={n} className="flex gap-4">
                <span className="tabular font-display mt-0.5 text-violet-400">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Risks">
          <ul className="space-y-3">
            {idea.analysis.risks.map((risk, n) => (
              <li key={n} className="flex gap-3 leading-relaxed text-zinc-400">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-zinc-600" />
                {risk}
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Who this is for">
          <p className="font-display text-lg italic leading-relaxed text-zinc-300">
            {idea.analysis.whoThisIsFor}
          </p>
        </Section>
      </div>

      {/* Prev / next within category */}
      <nav className="mt-4 grid gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-2">
        <Link
          href={`/ideas/${prev.slug}/`}
          className="group rounded-2xl border border-white/10 p-5 transition-colors hover:border-violet-500/40"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500">← Previous</span>
          <p className="font-display mt-2 text-zinc-200 transition-colors group-hover:text-violet-200">
            {prev.title}
          </p>
        </Link>
        <Link
          href={`/ideas/${next.slug}/`}
          className="group rounded-2xl border border-white/10 p-5 text-right transition-colors hover:border-violet-500/40"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500">Next →</span>
          <p className="font-display mt-2 text-zinc-200 transition-colors group-hover:text-violet-200">
            {next.title}
          </p>
        </Link>
      </nav>

      {/* More in category */}
      {category && (
        <aside className="mt-12">
          <h2 className="font-display text-2xl text-zinc-100">
            More in {category.name}
          </h2>
          <ul className="mt-5 space-y-3">
            {more.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/ideas/${s.slug}/`}
                  className="group flex items-baseline gap-3"
                >
                  <IdeaNo n={ideaNumber(s.slug)} className="text-xs" />
                  <span className="text-zinc-400 transition-colors group-hover:text-violet-200">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/categories/${category.slug}/`}
            className="mt-5 inline-block text-sm text-violet-300 transition-colors hover:text-violet-200"
          >
            All {siblings.length} {category.name} ideas →
          </Link>
        </aside>
      )}
    </article>
  );
}
