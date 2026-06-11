import {
  BUDGET_TIER_LABELS,
  EFFORT_TIER_LABELS,
  industryEmoji,
  industryLabel,
} from "../engine/types";
import type { FullIdea } from "../engine/types";

export default function IdeaCard({ idea }: { idea: FullIdea }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 shadow-2xl shadow-black/50 backdrop-blur">
      <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600" />
      <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-600/15 px-3 py-1 text-xs font-semibold text-violet-200">
            <span aria-hidden="true">{industryEmoji(idea.industry)}</span>
            {industryLabel(idea.industry)}
          </span>
          {idea.curated && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
              ★ Curated
            </span>
          )}
        </div>

        <h2 className="text-[22px] font-bold leading-snug tracking-tight text-zinc-50">
          {idea.title}
        </h2>

        <p className="text-[15px] leading-relaxed text-zinc-300">{idea.hook}</p>

        <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-3.5">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-fuchsia-300/90">
            Why it works
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-400">{idea.whyItWorks}</p>
        </div>

        <div className="rounded-2xl border border-violet-400/15 bg-violet-600/10 p-3.5">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-violet-300">
            Start here
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-300">{idea.firstStep}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
            {BUDGET_TIER_LABELS[idea.budgetTier]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
            {EFFORT_TIER_LABELS[idea.effortTier]}
          </span>
        </div>
      </div>
    </div>
  );
}
