import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TopIdeasPage() {
  const db = supabaseServer();
  const { data: likes } = await db.from("interactions").select("idea_id").eq("type", "like");
  const ideaIds = [...new Set((likes ?? []).map((r) => r.idea_id))].slice(0, 30);
  const { data: ideas } = ideaIds.length > 0 ? await db.from("ideas").select("id, idea_json, created_at").in("id", ideaIds) : { data: [] };

  const withCount = (ideas ?? []).map((idea) => {
    const likeCount = (likes ?? []).filter((l) => l.idea_id === idea.id).length;
    return { ...idea, likeCount };
  });
  withCount.sort((a, b) => b.likeCount - a.likeCount);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Top ideas</h1>
      <p className="text-gray-600 mb-6">Most liked by the community.</p>
      {withCount.length === 0 ? (
        <p className="text-gray-500">No ideas yet. Check back after people start liking ideas.</p>
      ) : (
        <ul className="space-y-4">
          {withCount.map((idea) => {
            const j = idea.idea_json as Record<string, unknown>;
            return (
              <li key={idea.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-medium text-gray-900">{String(j.title ?? "Idea")}</h2>
                    <p className="text-sm text-gray-600 mt-1">{String(j.one_sentence_hook ?? "")}</p>
                  </div>
                  <span className="text-sm text-gray-500">👍 {idea.likeCount}</span>
                </div>
                <Link href={`/idea/${idea.id}`} className="text-sm text-gray-900 underline mt-2 inline-block">View</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
