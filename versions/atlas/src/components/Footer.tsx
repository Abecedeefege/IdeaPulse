import Link from "next/link";
import { categories } from "@/data/categories";
import { allIdeas } from "@/data/ideas";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-zinc-100">
              IdeaPulse <span className="italic text-violet-300">Atlas</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              A hand-curated field guide of {allIdeas.length} business ideas,
              each with an honest mini-analysis. An edition of IdeaPulse.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Categories
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}/`}
                    className="text-zinc-400 transition-colors hover:text-violet-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Browse
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/ideas/" className="text-zinc-400 transition-colors hover:text-violet-300">
                  All {allIdeas.length} ideas
                </Link>
              </li>
              <li>
                <Link href="/collections/" className="text-zinc-400 transition-colors hover:text-violet-300">
                  Curated collections
                </Link>
              </li>
              <li>
                <Link href="/about/" className="text-zinc-400 transition-colors hover:text-violet-300">
                  About the Atlas
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-zinc-800/70 pt-6 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} IdeaPulse Atlas. Ideas are starting points, not guarantees.</p>
          <p className="tabular">90 ideas · 10 categories · 5 collections</p>
        </div>
      </div>
    </footer>
  );
}
