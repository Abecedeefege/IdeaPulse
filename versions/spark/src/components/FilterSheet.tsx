import { useState } from "react";
import {
  BUDGET_FILTER_LABELS,
  EFFORT_FILTER_LABELS,
} from "../engine/types";
import type { Industry, Profile } from "../engine/types";
import { InterestChips, TierSegment } from "./ProfileControls";

export default function FilterSheet({
  profile,
  onApply,
  onClose,
}: {
  profile: Profile;
  onApply: (profile: Profile) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Profile>(profile);

  const toggle = (id: Industry) =>
    setDraft((d) => ({
      ...d,
      interests: d.interests.includes(id)
        ? d.interests.filter((i) => i !== id)
        : [...d.interests, id],
    }));

  const ready = draft.interests.length >= 1;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filters">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[85vh] w-full max-w-md animate-fade-up overflow-y-auto rounded-t-3xl border border-white/10 bg-zinc-900/95 p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15" />
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Tune your deck</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:text-zinc-100"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Interests
        </h3>
        <InterestChips selected={draft.interests} onToggle={toggle} />

        <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Budget
        </h3>
        <TierSegment
          value={draft.budgetTier}
          onChange={(v) => setDraft((d) => ({ ...d, budgetTier: v }))}
          labels={BUDGET_FILTER_LABELS}
        />

        <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Effort
        </h3>
        <TierSegment
          value={draft.effortTier}
          onChange={(v) => setDraft((d) => ({ ...d, effortTier: v }))}
          labels={EFFORT_FILTER_LABELS}
        />

        <button
          type="button"
          disabled={!ready}
          onClick={() => onApply(draft)}
          className={`mt-7 w-full rounded-full px-6 py-3.5 text-base font-bold tracking-tight transition-all active:scale-[0.98] ${
            ready
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-xl shadow-violet-600/35 hover:brightness-110"
              : "cursor-not-allowed bg-white/5 text-zinc-600"
          }`}
        >
          {ready ? "Apply filters" : "Pick at least one interest"}
        </button>
      </div>
    </div>
  );
}
