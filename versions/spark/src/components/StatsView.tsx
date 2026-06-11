import { INDUSTRIES } from "../engine/types";
import type { SavedEntry, Stats } from "../lib/storage";

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-4 backdrop-blur">
      <div
        className={`text-2xl font-bold tracking-tight ${
          accent
            ? "bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            : "text-zinc-100"
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </div>
    </div>
  );
}

export default function StatsView({ stats, saved }: { stats: Stats; saved: SavedEntry[] }) {
  const likeRate = stats.seen > 0 ? Math.round((stats.liked / stats.seen) * 100) : 0;

  const byIndustry = INDUSTRIES.map((ind) => ({
    ...ind,
    count: saved.filter((s) => s.idea.industry === ind.id).length,
  })).filter((x) => x.count > 0);
  const maxCount = Math.max(1, ...byIndustry.map((x) => x.count));

  return (
    <div className="mx-auto w-full max-w-md px-5 pt-4">
      <h2 className="mb-4 text-xl font-bold tracking-tight">Your pulse</h2>

      <div className="mb-3 grid grid-cols-2 gap-3">
        <StatCard label="Ideas seen" value={String(stats.seen)} />
        <StatCard label="Like rate" value={`${likeRate}%`} accent />
        <StatCard label="Saved" value={String(stats.liked)} />
        <StatCard label="Skipped" value={String(stats.skipped)} />
      </div>

      <div className="mb-3 flex items-center gap-4 rounded-3xl border border-orange-400/15 bg-gradient-to-r from-orange-500/10 to-amber-500/5 p-4">
        <div className="text-4xl" aria-hidden="true">
          🔥
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-orange-200">
            {stats.streak} day{stats.streak === 1 ? "" : "s"}
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            Current streak · best {stats.bestStreak}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-4 backdrop-blur">
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Saved by industry
        </h3>
        {byIndustry.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-500">
            Save a few ideas to see where your taste leans.
          </p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {byIndustry
              .sort((a, b) => b.count - a.count)
              .map((row) => (
                <li key={row.id} className="flex items-center gap-2.5">
                  <span className="w-6 text-center text-sm" aria-hidden="true">
                    {row.emoji}
                  </span>
                  <span className="w-28 truncate text-xs font-medium text-zinc-400">
                    {row.label}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                      style={{ width: `${(row.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-5 text-right text-xs font-bold text-zinc-300">
                    {row.count}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
