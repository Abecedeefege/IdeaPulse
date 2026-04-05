"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { IdeaJson } from "@/types";

export default function AnonResultsPage() {
  const [ideas, setIdeas] = useState<IdeaJson[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("anon_ideas");
    if (raw) {
      try {
        setIdeas(JSON.parse(raw));
      } catch {
        /* ignore malformed data */
      }
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (ideas.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-2xl font-bold text-white mb-4">No ideas found</h1>
        <p className="text-zinc-400 mb-6">Generate some ideas first!</p>
        <Link href="/onboarding" className="text-violet-400 hover:text-violet-300 font-medium">
          Go to Idea Hub →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 rounded-xl border border-violet-500/50 bg-violet-500/10 p-4 text-center">
        <p className="text-sm text-zinc-300 mb-2">
          Create a free account to get <strong>20 ideas per day</strong> and save them to your dashboard.
        </p>
        <a
          href="/login"
          className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Sign up free
        </a>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Your new ideas</h1>
      <p className="text-zinc-400 mb-8">Sign up to save, like, and get deep analysis on your ideas.</p>

      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {ideas.map((idea, i) => (
          <li
            key={i}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <h2 className="font-semibold text-white">{idea.title}</h2>
            <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{idea.one_sentence_hook}</p>
            <p className="text-xs text-zinc-500 mt-2">Difficulty: {idea.difficulty_1_to_5}/5</p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href="/onboarding" className="text-zinc-400 hover:text-zinc-300">
          ← Back to Idea Hub
        </Link>
      </div>
    </div>
  );
}
