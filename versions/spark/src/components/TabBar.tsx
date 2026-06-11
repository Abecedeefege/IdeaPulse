export type Tab = "deck" | "saved" | "stats";

const TABS: { id: Tab; label: string; icon: (active: boolean) => JSX.Element }[] = [
  {
    id: "deck",
    label: "Deck",
    icon: (active) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} aria-hidden="true">
        <rect x="6.5" y="4" width="13" height="17" rx="2.5" transform="rotate(6 13 12.5)" />
        <rect x="3" y="4.5" width="12" height="15.5" rx="2.5" fill="#09090b" />
      </svg>
    ),
  },
  {
    id: "saved",
    label: "Saved",
    icon: (active) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path d="M12 20.5s-7.5-4.7-9.3-9.2C1.3 7.7 3.6 4.5 6.9 4.5c2 0 3.7 1.1 5.1 3 1.4-1.9 3.1-3 5.1-3 3.3 0 5.6 3.2 4.2 6.8-1.8 4.5-9.3 9.2-9.3 9.2z" />
      </svg>
    ),
  },
  {
    id: "stats",
    label: "Stats",
    icon: (active) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" aria-hidden="true">
        <path d="M5 20V13M12 20V5M19 20v-9" />
      </svg>
    ),
  },
];

export default function TabBar({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-[#09090b]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto grid w-full max-w-md grid-cols-3">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold tracking-wide transition-colors ${
                active ? "text-violet-300" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t.icon(active)}
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
