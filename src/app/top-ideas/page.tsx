import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";
import { TrendingIdeaRequestsSection } from "@/components/TrendingIdeaRequestsSection";

export const metadata: Metadata = {
  title: "Top Ideas | IdeaPulse",
  description: "Trending prompts and community-favorite business ideas.",
  openGraph: { title: "Top Ideas | IdeaPulse", description: "Trending prompts and community-favorite business ideas." },
};

export const dynamic = "force-dynamic";

export default async function TopIdeasPage() {
  let dbIdeas: { id: string; idea_json: unknown; created_at?: string; likeCount: number }[] = [];
  try {
    const db = supabaseServer();
    const { data: likes } = await db.from("interactions").select("idea_id").eq("type", "like");
    const ideaIds = [...new Set((likes ?? []).map((r) => r.idea_id))].slice(0, 50);
    const { data: ideas } = ideaIds.length > 0 ? await db.from("ideas").select("id, idea_json, created_at").in("id", ideaIds) : { data: [] };

    dbIdeas = (ideas ?? []).map((idea) => {
      const likeCount = (likes ?? []).filter((l) => l.idea_id === idea.id).length;
      return { ...idea, likeCount };
    });
    dbIdeas.sort((a, b) => b.likeCount - a.likeCount);
  } catch {
    // Supabase not configured or DB error
  }

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Top ideas</h1>
        <p className="text-zinc-400 mb-2">Trending prompts and ideas the community loves.</p>
      </div>

      <TrendingIdeaRequestsSection
        heading="Trending idea requests"
        description="Super detailed prompts that get great ideas. Click to see why they work."
      />

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Community favorites</h2>
        <p className="text-zinc-400 mb-8">Most liked on IdeaPulse.</p>
        {dbIdeas.length === 0 ? (
          <p className="text-zinc-500">No liked ideas yet. Like some ideas from your batches to see them here.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dbIdeas.map((item) => {
              const j = item.idea_json as Record<string, unknown>;
              const title = String(j.title ?? "Idea");
              const hook = String(j.one_sentence_hook ?? "");
              return (
                <li key={item.id}>
                  <Link
                    href={`/idea/${item.id}`}
                    className="group flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-white line-clamp-2">{title}</h3>
                      {item.likeCount > 0 && (
                        <span className="shrink-0 text-xs text-zinc-500">👍 {item.likeCount}</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-400 line-clamp-3">{hook}</p>
                    <span className="mt-3 inline-flex text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                      View →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
