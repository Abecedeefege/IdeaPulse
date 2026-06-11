import Link from "next/link";
import type { AtlasIdea, CategorySlug } from "@/data/types";
import { getCategoryBySlug } from "@/data/categories";

export function CategoryPill({
  category,
  asLink = false,
}: {
  category: CategorySlug;
  asLink?: boolean;
}) {
  const cat = getCategoryBySlug(category);
  const className =
    "inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-violet-300";
  if (!cat) return null;
  if (asLink) {
    return (
      <Link
        href={`/categories/${cat.slug}/`}
        className={`${className} transition-colors hover:border-violet-400/50 hover:text-violet-200`}
      >
        {cat.name}
      </Link>
    );
  }
  return <span className={className}>{cat.name}</span>;
}

export function DifficultyDots({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      title={`Difficulty ${level} of 5`}
      aria-label={`Difficulty ${level} of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-1.5 rounded-full ${
            n <= level ? "bg-violet-400" : "bg-zinc-700"
          }`}
        />
      ))}
    </span>
  );
}

const capitalLabels: Record<AtlasIdea["capital"], string> = {
  "under-500": "Under $500",
  "500-5k": "$500–5K",
  "5k-plus": "$5K+",
};

export function CapitalBadge({ capital }: { capital: AtlasIdea["capital"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
      {capitalLabels[capital]} to start
    </span>
  );
}

export function IdeaNo({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`tabular font-display text-violet-400/90 ${className}`}>
      № {String(n).padStart(3, "0")}
    </span>
  );
}
