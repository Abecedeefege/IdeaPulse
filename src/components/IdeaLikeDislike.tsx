"use client";

import { useState, memo } from "react";

type Props = {
  ideaId: string;
  showDislike?: boolean;
  onLiked?: () => void;
};

export default memo(function IdeaLikeDislike({ ideaId, showDislike = true, onLiked }: Props) {
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
      if (res.ok && type === "like" && onLiked) {
        onLiked();
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
        {loading === "like" ? <span aria-label="Loading">…</span> : "👍 Like"}
      </button>
      {showDislike && (
        <button
          type="button"
          onClick={() => act("dislike")}
          disabled={!!loading}
          className="text-sm text-zinc-400 hover:text-violet-400 disabled:opacity-50"
        >
          {loading === "dislike" ? <span aria-label="Loading">…</span> : "👎 Dislike"}
        </button>
      )}
    </div>
  );
});
