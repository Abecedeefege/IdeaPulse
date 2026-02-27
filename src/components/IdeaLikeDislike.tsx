"use client";

import { useState, memo } from "react";

type Props = { ideaId: string };

export default memo(function IdeaLikeDislike({ ideaId }: Props) {
  const [loading, setLoading] = useState<"like" | "dislike" | null>(null);

  const act = async (type: "like" | "dislike") => {
    setLoading(type);
    try {
      const res = await fetch(`/api/idea/${ideaId}/${type}`, { method: "POST", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (res.status === 402 && data.redirect) {
        window.location.href = data.redirect;
        return;
      }
      if (res.ok) {
        // Optional: update local state to show voted
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <button
        type="button"
        onClick={() => act("like")}
        disabled={!!loading}
        className="text-sm text-zinc-400 hover:text-violet-400 disabled:opacity-50"
      >
        {loading === "like" ? "…" : "👍 Like"}
      </button>
      <button
        type="button"
        onClick={() => act("dislike")}
        disabled={!!loading}
        className="text-sm text-zinc-400 hover:text-violet-400 disabled:opacity-50"
      >
        {loading === "dislike" ? "…" : "👎 Dislike"}
      </button>
    </div>
  );
});
