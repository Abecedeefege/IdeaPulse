export default function Header({ streak }: { streak: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#09090b]/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-600/30">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white" aria-hidden="true">
              <path d="M13 2 4.5 14h5.2L8.5 22 19.5 9h-5.7L13 2z" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight">
              IdeaPulse <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Spark</span>
            </div>
          </div>
        </div>
        {streak > 0 && (
          <div
            className="flex items-center gap-1 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-sm font-semibold text-orange-300"
            title={`${streak}-day streak`}
          >
            <span aria-hidden="true">🔥</span>
            {streak}
          </div>
        )}
      </div>
    </header>
  );
}
