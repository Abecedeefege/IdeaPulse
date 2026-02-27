"use client";

import Link from "next/link";

export default function IdeaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Failed to load idea</h2>
      <p className="text-zinc-400 mb-6">
        {error.message || "Could not load this idea. Please try again."}
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-xl font-medium transition-colors"
        >
          Retry
        </button>
        <Link href="/dashboard" className="text-violet-400 hover:text-violet-300 px-6 py-2">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
