import { INDUSTRIES } from "../engine/types";
import type { Industry, TierFilter } from "../engine/types";

export function InterestChips({
  selected,
  onToggle,
}: {
  selected: Industry[];
  onToggle: (id: Industry) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {INDUSTRIES.map((ind) => {
        const active = selected.includes(ind.id);
        return (
          <button
            key={ind.id}
            type="button"
            onClick={() => onToggle(ind.id)}
            aria-pressed={active}
            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-all active:scale-95 ${
              active
                ? "border-violet-400/60 bg-violet-600/25 text-violet-100 shadow-md shadow-violet-600/20"
                : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
            }`}
          >
            <span className="mr-1.5" aria-hidden="true">
              {ind.emoji}
            </span>
            {ind.label}
          </button>
        );
      })}
    </div>
  );
}

const TIER_OPTIONS: TierFilter[] = [0, 1, 2, 3];

export function TierSegment({
  value,
  onChange,
  labels,
}: {
  value: TierFilter;
  onChange: (v: TierFilter) => void;
  labels: Record<TierFilter, string>;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TIER_OPTIONS.map((tier) => {
        const active = value === tier;
        return (
          <button
            key={tier}
            type="button"
            onClick={() => onChange(tier)}
            aria-pressed={active}
            className={`rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all active:scale-95 ${
              active
                ? "border-fuchsia-400/60 bg-fuchsia-600/20 text-fuchsia-100 shadow-md shadow-fuchsia-600/20"
                : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
            }`}
          >
            {labels[tier]}
          </button>
        );
      })}
    </div>
  );
}
