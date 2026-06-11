import { industryEmoji, industryLabel } from "../engine/types";
import type { FullIdea } from "../engine/types";
import type { SavedEntry } from "../lib/storage";

export default function SavedView({
  saved,
  onRemove,
  onShare,
  onGoDeck,
}: {
  saved: SavedEntry[];
  onRemove: (id: string) => void;
  onShare: (idea: FullIdea) => void;
  onGoDeck: () => void;
}) {
  if (saved.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-8 pt-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-3xl">
          💡
        </div>
        <h2 className="text-xl font-bold tracking-tight">No saved ideas yet</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          Swipe right on ideas you'd actually build. They'll land here, ready to
          revisit and share.
        </p>
        <button
          type="button"
          onClick={onGoDeck}
          className="mt-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-violet-600/35 transition active:scale-95"
        >
          Back to the deck
        </button>
      </div>
    );
  }

  const sorted = [...saved].sort((a, b) => b.savedAt - a.savedAt);

  return (
    <div className="mx-auto w-full max-w-md px-5 pt-4">
      <h2 className="mb-1 text-xl font-bold tracking-tight">Saved ideas</h2>
      <p className="mb-4 text-xs text-zinc-500">
        {saved.length} {saved.length === 1 ? "idea" : "ideas"} in your collection
      </p>
      <ul className="flex flex-col gap-3">
        {sorted.map(({ idea, savedAt }) => (
          <li
            key={idea.id}
            className="animate-fade-up rounded-3xl border border-white/10 bg-zinc-900/70 p-4 backdrop-blur"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/25 bg-violet-600/15 px-2.5 py-0.5 text-[11px] font-semibold text-violet-200">
                <span aria-hidden="true">{industryEmoji(idea.industry)}</span>
                {industryLabel(idea.industry)}
              </span>
              {idea.curated && (
                <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-200">
                  ★ Curated
                </span>
              )}
              <span className="ml-auto text-[11px] text-zinc-600">
                {new Date(savedAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-[15px] font-bold leading-snug tracking-tight">{idea.title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{idea.hook}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onShare(idea)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-violet-400/40 hover:text-violet-200 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="12" r="2.6" />
                  <circle cx="17.5" cy="5.5" r="2.6" />
                  <circle cx="17.5" cy="18.5" r="2.6" />
                  <path d="M8.3 10.8l6.9-4M8.3 13.2l6.9 4" />
                </svg>
                Share
              </button>
              <button
                type="button"
                onClick={() => onRemove(idea.id)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 transition hover:border-rose-400/40 hover:text-rose-300 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l1 13h9l1-13" />
                </svg>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
