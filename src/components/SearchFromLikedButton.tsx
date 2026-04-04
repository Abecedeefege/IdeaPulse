"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchFromLikedButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ideas/search-from-liked", {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        setLoading(false);
        return;
      }
      router.push("/ideas");
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white shadow shadow-emerald-900/30 hover:bg-emerald-500 disabled:opacity-60 transition-colors"
      >
        {loading ? (
          <>
            <span className="h-3 w-3 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
            Searching from liked ideas…
          </>
        ) : (
          <>Search from liked ideas</>
        )}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

