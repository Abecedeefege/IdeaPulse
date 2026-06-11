export default function ActionBar({
  onSkip,
  onSave,
  onShare,
  disabled,
}: {
  onSkip: () => void;
  onSave: () => void;
  onShare: () => void;
  disabled: boolean;
}) {
  const base =
    "flex items-center justify-center rounded-full border backdrop-blur transition-all active:scale-90 disabled:opacity-40 disabled:active:scale-100";
  return (
    <div className="flex items-center justify-center gap-5">
      <button
        type="button"
        onClick={onSkip}
        disabled={disabled}
        aria-label="Skip idea (left arrow)"
        title="Skip (←)"
        className={`${base} h-14 w-14 border-rose-400/25 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        aria-label="Save idea (right arrow)"
        title="Save (→)"
        className={`${base} h-[72px] w-[72px] border-emerald-400/30 bg-gradient-to-br from-emerald-500/25 to-emerald-600/10 text-emerald-300 shadow-xl shadow-emerald-500/15 hover:from-emerald-500/35`}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
          <path d="M12 20.5s-7.5-4.7-9.3-9.2C1.3 7.7 3.6 4.5 6.9 4.5c2 0 3.7 1.1 5.1 3 1.4-1.9 3.1-3 5.1-3 3.3 0 5.6 3.2 4.2 6.8-1.8 4.5-9.3 9.2-9.3 9.2z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onShare}
        disabled={disabled}
        aria-label="Share idea"
        title="Share"
        className={`${base} h-14 w-14 border-violet-400/25 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="17.5" cy="5.5" r="2.6" />
          <circle cx="17.5" cy="18.5" r="2.6" />
          <path d="M8.3 10.8l6.9-4M8.3 13.2l6.9 4" />
        </svg>
      </button>
    </div>
  );
}
