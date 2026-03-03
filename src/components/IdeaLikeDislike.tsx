"use client";

import { useState, memo } from "react";
import { useAuth } from "@/lib/useAuth";
import AuthPrompt from "@/components/AuthPrompt";

type Props = { ideaId: string };

export default memo(function IdeaLikeDislike({ ideaId }: Props) {
  const loggedIn = useAuth();
  const [loading, setLoading] = useState<"like" | "dislike" | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [voted, setVoted] = useState<"like" | "dislike" | null>(null);

  const act = async (type: "like" | "dislike") => {
    if (loggedIn === false) {
      setShowAuth(true);
      return;
    }
    setLoading(type);
    try {
      const res = await fetch(`/api/idea/${ideaId}/${type}`, { method: "POST", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setShowAuth(true);
        return;
      }
      if (res.status === 402 && data.redirect) {
        window.location.href = data.redirect;
        return;
      }
      if (res.ok) {
        setVoted(type);
      }
    } finally {
      setLoading(null);
    }
  };

  if (showAuth) {
    return <AuthPrompt onClose={() => setShowAuth(false)} message="Log in to react to ideas" />;
  }

  return (
    <div className="flex gap-2 mt-2">
      <button
        type="button"
        onClick={() => act("like")}
        disabled={!!loading || voted !== null}
        className={`text-sm disabled:opacity-50 transition-colors ${voted === "like" ? "text-violet-400" : "text-zinc-400 hover:text-violet-400"}`}
      >
        {loading === "like" ? <span aria-label="Loading">…</span> : voted === "like" ? "👍 Liked" : "👍 Like"}
      </button>
      <button
        type="button"
        onClick={() => act("dislike")}
        disabled={!!loading || voted !== null}
        className={`text-sm disabled:opacity-50 transition-colors ${voted === "dislike" ? "text-violet-400" : "text-zinc-400 hover:text-violet-400"}`}
      >
        {loading === "dislike" ? <span aria-label="Loading">…</span> : voted === "dislike" ? "👎 Disliked" : "👎 Dislike"}
      </button>
    </div>
  );
});
