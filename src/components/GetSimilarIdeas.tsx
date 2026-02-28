"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { IdeaJson } from "@/types";
import FirehoseLoader from "@/components/FirehoseLoader";
import IdeaLikeDislike from "@/components/IdeaLikeDislike";

type SimilarIdea = IdeaJson & { _savedId?: string | null };

type Props =
  | { seedIdea: IdeaJson | Record<string, unknown>; context?: never }
  | { seedIdea?: never; context: string };

export default function GetSimilarIdeas(props: Props) {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<SimilarIdea[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const fetchSimilar = async () => {
    setError(null);
    setIdeas(null);
    const meRes = await fetch("/api/me", { credentials: "include" });
    if (meRes.status === 401) {
      const redirect = pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : "/login";
      window.location.href = redirect;
      return;
    }
    setLoading(true);
    try {
      const body = props.seedIdea ? { seedIdea: props.seedIdea } : { context: props.context };
      const res = await fetch("/api/similar-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `Error ${res.status}`);
        return;
      }
      setIdeas((data.ideas || []) as SimilarIdea[]);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <FirehoseLoader show={loading} contained label="Generating similar ideas…" />
      {!ideas || ideas.length === 0 ? (
        <>
          <button
            type="button"
            onClick={fetchSimilar}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
          >
            Get similar ideas
          </button>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </>
      ) : (
        <>
          <p className="text-zinc-400 text-sm mb-4">React to ideas to improve the next batch</p>
          <ul className="space-y-3">
            {ideas.map((idea, idx) => {
              const hasLink = !!idea._savedId;
              const content = (
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white">{idea.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{idea.one_sentence_hook}</p>
                    <p className="text-xs text-zinc-500 mt-2">
                      Difficulty: {String(idea.difficulty_1_to_5 ?? "—")}/5
                    </p>
                  </div>
                  {hasLink && (
                    <span className="shrink-0 text-xs text-violet-400 mt-1">View →</span>
                  )}
                </div>
              );

              return (
                <li
                  key={idea._savedId || idx}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
                >
                  {hasLink ? (
                    <Link href={`/idea/${idea._savedId}`} className="block p-4">
                      {content}
                    </Link>
                  ) : (
                    <div className="p-4">{content}</div>
                  )}
                  <div className="px-4 pb-3 pt-0">
                    {idea._savedId ? (
                      <IdeaLikeDislike ideaId={idea._savedId} />
                    ) : (
                      <p className="text-xs text-zinc-600">Log in to react to ideas</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
