export default function TopIdeasLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-zinc-800 rounded w-40 mb-2" />
      <div className="h-5 bg-zinc-800 rounded w-64 mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-zinc-800 p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="h-5 bg-zinc-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-zinc-800 rounded w-full" />
              </div>
              <div className="h-5 bg-zinc-800 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
