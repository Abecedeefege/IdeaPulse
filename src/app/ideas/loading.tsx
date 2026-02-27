export default function IdeasLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-zinc-800 rounded w-64 mb-2" />
      <div className="h-5 bg-zinc-800 rounded w-48 mb-8" />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-zinc-800 p-4">
            <div className="h-5 bg-zinc-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
            <div className="h-4 bg-zinc-800 rounded w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
