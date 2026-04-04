"use client";

import IdeaGenerationLoader from "@/components/IdeaGenerationLoader";
import { useIdeaGenerationRun } from "@/hooks/use-idea-generation-run";

export default function SearchFromLikedButton() {
  const { run, loading, messages, sessionKey } = useIdeaGenerationRun();

  const handleClick = () => {
    void run(
      async () => {
        const res = await fetch("/api/ideas/search-from-liked", {
          method: "POST",
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return { error: data.error || "Something went wrong. Try again." };
        return { batchId: data.batchId as string };
      },
      "search-from-liked",
    );
  };

  return (
    <div className="space-y-2">
      <IdeaGenerationLoader show={loading} messages={messages} sessionKey={sessionKey} />
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
    </div>
  );
}
