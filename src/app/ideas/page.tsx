import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";
import Link from "next/link";
import IdeaLikeDislike from "@/components/IdeaLikeDislike";

export const dynamic = "force-dynamic";

export default async function IdeasPage() {
  const authUser = await getServerUser();
  const db = supabaseServer();
  const { data: appUser } = authUser
    ? await db.from("users").select("id").eq("email", authUser.email).single()
    : { data: null };

  const { data: batchesData } = appUser
    ? await db
        .from("idea_batches")
        .select("id, scheduled_for_date, created_at")
        .eq("user_id", appUser.id)
        .order("created_at", { ascending: false })
        .limit(1)
    : { data: null };
  const batch = batchesData?.[0];

  const { data: ideasData } = batch
    ? await db
        .from("ideas")
        .select("id, batch_id, idea_json, created_at")
        .eq("batch_id", batch.id)
        .order("created_at")
    : { data: null };
  const list = ideasData ?? [];

  if (!authUser || !appUser || list.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your ideas</h1>
        <p className="text-zinc-400 mb-6">No ideas yet. Request a batch from the dashboard to get your first ideas.</p>
        <Link href="/dashboard" className="text-violet-400 hover:text-violet-300 font-medium">
          Go to dashboard →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Here is your first batch</h1>
      <p className="text-zinc-400 mb-8">Like or dislike to improve results →</p>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {list.map((idea) => {
          const j = idea.idea_json as Record<string, unknown>;
          const title = String(j.title ?? "Idea");
          const hook = String(j.one_sentence_hook ?? "");
          const difficulty = String(j.difficulty_1_to_5 ?? "—");
          return (
            <li
              key={idea.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-colors"
            >
              <Link href={`/idea/${idea.id}`} className="block">
                <h2 className="font-semibold text-white">{title}</h2>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{hook}</p>
                <p className="text-xs text-zinc-500 mt-2">Difficulty: {difficulty}/5</p>
              </Link>
              <div className="flex items-center justify-between gap-2 mt-3 flex-wrap">
                <IdeaLikeDislike ideaId={idea.id} />
                <Link href={`/idea/${idea.id}`} className="text-sm text-violet-400 hover:text-violet-300">
                  View idea →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
