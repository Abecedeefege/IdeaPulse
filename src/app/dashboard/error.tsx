"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Failed to load dashboard</h2>
      <p className="text-zinc-400 mb-6">
        {error.message || "Could not load your ideas. Please try again."}
      </p>
      <button
        onClick={reset}
        className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-xl font-medium transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
