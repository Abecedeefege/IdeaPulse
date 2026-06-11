import { useState } from "react";
import {
  BUDGET_FILTER_LABELS,
  EFFORT_FILTER_LABELS,
} from "../engine/types";
import type { Industry, Profile, TierFilter } from "../engine/types";
import { InterestChips, TierSegment } from "./ProfileControls";

export default function Onboarding({ onDone }: { onDone: (profile: Profile) => void }) {
  const [interests, setInterests] = useState<Industry[]>([]);
  const [budgetTier, setBudgetTier] = useState<TierFilter>(0);
  const [effortTier, setEffortTier] = useState<TierFilter>(0);

  const toggle = (id: Industry) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const ready = interests.length >= 1;

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col gap-7 px-5 pb-16 pt-10">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />

      <div className="relative animate-fade-up">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-xl shadow-violet-600/40">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="white" aria-hidden="true">
            <path d="M13 2 4.5 14h5.2L8.5 22 19.5 9h-5.7L13 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tune your{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            deck
          </span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Swipe right to save business ideas, left to skip. Pick what you care
          about and we'll deal you a fresh, personal deck every day.
        </p>
      </div>

      <section className="relative animate-fade-up" style={{ animationDelay: "60ms" }}>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Interests <span className="normal-case text-zinc-600">(pick at least one)</span>
        </h2>
        <InterestChips selected={interests} onToggle={toggle} />
      </section>

      <section className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Budget
        </h2>
        <TierSegment value={budgetTier} onChange={setBudgetTier} labels={BUDGET_FILTER_LABELS} />
      </section>

      <section className="relative animate-fade-up" style={{ animationDelay: "180ms" }}>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Effort
        </h2>
        <TierSegment value={effortTier} onChange={setEffortTier} labels={EFFORT_FILTER_LABELS} />
      </section>

      <button
        type="button"
        disabled={!ready}
        onClick={() => onDone({ interests, budgetTier, effortTier })}
        className={`relative mt-2 w-full rounded-full px-6 py-4 text-base font-bold tracking-tight transition-all active:scale-[0.98] ${
          ready
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-xl shadow-violet-600/35 hover:brightness-110"
            : "cursor-not-allowed bg-white/5 text-zinc-600"
        }`}
      >
        {ready ? "Start swiping →" : "Pick at least one interest"}
      </button>
    </div>
  );
}
