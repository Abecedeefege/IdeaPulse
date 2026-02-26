"use client";

import { useState } from "react";
import type { IdeaJson } from "@/types";
import FirehoseLoader from "@/components/FirehoseLoader";
import Link from "next/link";

type Props =
  | { seedIdea: IdeaJson | Record<string, unknown>; context?: never }
  | { seedIdea?: never; context: string };

export default function GetSimilarIdeas(props: Props) {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<IdeaJson[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSimilar = async () => {
    setLoading(true);
    setError(null);
    setIdeas(null);
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
      setIdeas((data.ideas || []) as IdeaJson[]);
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
          <p className="text-zinc-400 text-sm mb-4">React to ideas to improve the following batch</p>
          <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {ideas.map((idea, idx) => (
              <li
                key={idx}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-colors"
              >
                <h3 className="font-semibold text-white">{idea.title}</h3>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{idea.one_sentence_hook}</p>
                <p className="text-xs text-zinc-500 mt-2">
                  Difficulty: {String(idea.difficulty_1_to_5 ?? "—")}/5
                </p>
                <p className="text-xs text-zinc-500 mt-1">First step: {idea.first_step_under_30min}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/signup"
              className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Get more ideas like these
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
