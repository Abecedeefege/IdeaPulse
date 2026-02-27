export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
      <div className="h-12 bg-zinc-800 rounded-xl mb-6" />
      <div className="h-5 bg-zinc-800 rounded w-72 mb-6" />
      <div className="space-y-8">
        {[1, 2].map((b) => (
          <div key={b}>
            <div className="h-6 bg-zinc-800 rounded w-40 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-zinc-800 rounded-xl p-4">
                  <div className="h-5 bg-zinc-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
                  <div className="h-4 bg-zinc-800 rounded w-24" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
