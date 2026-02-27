import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";
import { curatedIdeas } from "@/data/curated-ideas";

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

  const curatedWithCount = curatedIdeas.map((c) => ({ slug: c.slug, category: c.category, idea_json: c.idea_json, likeCount: 0 }));
  const allIdeas = [...dbIdeas.map((i) => ({ type: "db" as const, id: i.id, idea_json: i.idea_json, likeCount: i.likeCount })),
    ...curatedWithCount.map((c) => ({ type: "curated" as const, slug: c.slug, category: c.category, idea_json: c.idea_json, likeCount: c.likeCount }))];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Top ideas</h1>
      <p className="text-zinc-400 mb-8">Most liked by the community + curated picks.</p>
      <ul className="space-y-4">
        {allIdeas.map((item) => {
          const j = item.idea_json as Record<string, unknown>;
          const title = String(j.title ?? "Idea");
          const hook = String(j.one_sentence_hook ?? "");
          const isCurated = item.type === "curated";
          const link = isCurated ? `/idea/curated/${(item as { slug: string }).slug}` : `/idea/${(item as { id: string }).id}`;
          const category = isCurated ? (item as { category: string }).category : null;
          return (
            <li key={isCurated ? (item as { slug: string }).slug : (item as { id: string }).id} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-colors">
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {category && (
                      <span className="text-xs font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">
                        {category}
                      </span>
                    )}
                    {!isCurated && (item as { likeCount: number }).likeCount > 0 && (
                      <span className="text-xs text-zinc-500">👍 {(item as { likeCount: number }).likeCount}</span>
                    )}
                  </div>
                  <h2 className="font-semibold text-white mt-1">{title}</h2>
                  <p className="text-sm text-zinc-400 mt-0.5 line-clamp-2">{hook}</p>
                </div>
                <Link href={link} className="shrink-0 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                  View →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
