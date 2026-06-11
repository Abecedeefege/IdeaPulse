import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { ideaNumber, ideasByCategory } from "@/data/ideas";
import type { CategorySlug } from "@/data/types";
import { IdeaCard } from "@/components/IdeaCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} Ideas`,
    description: category.blurb,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const ideas = ideasByCategory(slug as CategorySlug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
        Territory · {ideas.length} ideas
      </p>
      <div className="mt-3 flex items-center gap-4">
        <span className="font-display text-4xl text-violet-400" aria-hidden="true">
          {category.icon}
        </span>
        <h1 className="font-display text-4xl text-zinc-50 sm:text-5xl">
          {category.name}
        </h1>
      </div>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
        {category.blurb}
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <IdeaCard key={idea.slug} idea={idea} number={ideaNumber(idea.slug)} />
        ))}
      </div>

      <div className="mt-14 border-t border-zinc-800 pt-8">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Other territories
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}/`}
                className="rounded-full border border-zinc-700 px-3.5 py-1.5 text-sm text-zinc-400 transition-colors hover:border-violet-500/50 hover:text-violet-200"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
