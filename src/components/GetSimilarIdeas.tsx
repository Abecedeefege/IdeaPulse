"use client";

import { useState } from "react";
import type { IdeaJson } from "@/types";
import FirehoseLoader from "@/components/FirehoseLoader";

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
      <FirehoseLoader show={loading} label="Generating similar ideas…" />
      <button
        type="button"
        onClick={fetchSimilar}
        disabled={loading}
        className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
      >
        Get similar ideas
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      {ideas && ideas.length > 0 && (
        <ul className="mt-4 space-y-3">
          {ideas.map((idea, idx) => (
            <li key={idx} className="border border-zinc-800 rounded-lg p-3 bg-zinc-900/60">
              <h3 className="text-sm font-semibold text-white">{idea.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">{idea.one_sentence_hook}</p>
              <p className="text-xs text-zinc-500 mt-2">First step: {idea.first_step_under_30min}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
