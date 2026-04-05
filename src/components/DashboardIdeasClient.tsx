"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import DashboardIdeaActions from "@/components/DashboardIdeaActions";

const PAGE_SIZE = 20;

type DashboardIdea = {
  id: string;
  batch_id: string;
  idea_json: unknown;
  created_at: string;
  slug: string | null;
  is_liked?: boolean;
};

type Props = {
  initialIdeas: DashboardIdea[];
};

export default function DashboardIdeasClient({ initialIdeas }: Props) {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [likedIds, setLikedIds] = useState<Set<string>>(
    () => new Set(initialIdeas.filter((i) => i.is_liked).map((i) => i.id))
  );
  const [page, setPage] = useState(0);

  const handleDelete = useCallback((ideaId: string) => {
    setIdeas((prev) => prev.filter((i) => i.id !== ideaId));
  }, []);

  const handleLiked = useCallback((ideaId: string) => {
    setLikedIds((prev) => new Set(prev).add(ideaId));
  }, []);

  const totalPages = Math.ceil(ideas.length / PAGE_SIZE);
  const pageIdeas = useMemo(
    () => ideas.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [ideas, page]
  );

  if (ideas.length === 0) {
    return (
      <p className="text-zinc-500">
        No ideas yet. Request your first 5 ideas above.
      </p>
    );
  }

  return (
    <div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-900/80">
            <tr className="text-left text-zinc-400">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Hook</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Created</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Difficulty</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageIdeas.map((idea) => {
              const j = idea.idea_json as Record<string, unknown>;
              const title = String(j.title ?? "Idea");
              const hook = String(j.one_sentence_hook ?? "");
              const difficulty = String(j.difficulty_1_to_5 ?? "\u2014");
              const created = idea.created_at ? new Date(idea.created_at).toLocaleDateString() : "\u2014";
              const isLiked = likedIds.has(idea.id);
              const href = `/idea/${idea.slug || idea.id}`;
              return (
                <tr
                  key={idea.id}
                  className={`border-t border-zinc-800/80 transition-colors ${
                    isLiked ? "bg-emerald-500/10" : "hover:bg-zinc-900/80"
                  }`}
                >
                  <td className="px-4 py-3 align-top">
                    <Link href={href} className="font-medium text-white hover:text-violet-300">
                      {title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 align-top max-w-md">
                    <p className="text-zinc-400 line-clamp-2">{hook}</p>
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-zinc-400">{created}</td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-zinc-400">{difficulty}/5</td>
                  <td className="px-4 py-3 align-top">
                    <DashboardIdeaActions
                      ideaId={idea.id}
                      onDelete={() => handleDelete(idea.id)}
                      onLiked={() => handleLiked(idea.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-zinc-400">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
