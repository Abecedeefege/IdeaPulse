import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";
import Link from "next/link";
import IdeaLikeDislike from "@/components/IdeaLikeDislike";

export const dynamic = "force-dynamic";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const { batch: batchIdParam } = await searchParams;

  if (!batchIdParam) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-2xl font-bold text-white mb-4">No batch specified</h1>
        <p className="text-zinc-400 mb-6">It looks like you arrived here without a batch. Generate some ideas first!</p>
        <Link href="/onboarding" className="text-violet-400 hover:text-violet-300 font-medium">
          Go to Idea Hub →
        </Link>
      </div>
    );
  }

  const authUser = await getServerUser();
  const db = supabaseServer();
  const { data: appUser } = authUser
    ? await db.from("users").select("id").eq("id", authUser.id).single()
    : { data: null };

  let batchId: string | null = null;
  if (appUser) {
    const { data: batchForUser } = await db
      .from("idea_batches")
      .select("id")
      .eq("id", batchIdParam)
      .eq("user_id", appUser.id)
      .maybeSingle();
    if (batchForUser?.id) batchId = batchForUser.id;
  }

  const { data: ideasData } = batchId
    ? await db
        .from("ideas")
        .select("id, batch_id, idea_json, created_at, slug")
        .eq("batch_id", batchId)
        .order("created_at")
    : { data: null };
  const list = ideasData ?? [];

  if (!authUser || !appUser || list.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-2xl font-bold text-white mb-4">No ideas found</h1>
        <p className="text-zinc-400 mb-6">
          We couldn&apos;t find ideas for this batch. They may have been deleted or the link is invalid.
        </p>
        <Link href="/onboarding" className="text-violet-400 hover:text-violet-300 font-medium">
          Generate new ideas →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Your new ideas</h1>
      <p className="text-zinc-400 mb-8">Like or dislike to improve your next batch of ideas.</p>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {list.map((idea) => {
          const j = idea.idea_json as Record<string, unknown>;
          const title = String(j.title ?? "Idea");
          const hook = String(j.one_sentence_hook ?? "");
          const difficulty = String(j.difficulty_1_to_5 ?? "—");
          const href = `/idea/${(idea as Record<string, unknown>).slug || idea.id}`;
          return (
            <li
              key={idea.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-colors"
            >
              <Link href={href} className="block">
                <h2 className="font-semibold text-white">{title}</h2>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{hook}</p>
                <p className="text-xs text-zinc-500 mt-2">Difficulty: {difficulty}/5</p>
              </Link>
              <div className="flex items-center justify-between gap-2 mt-3 flex-wrap">
                <IdeaLikeDislike ideaId={idea.id} />
                <Link href={href} className="text-sm text-violet-400 hover:text-violet-300">
                  View idea →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex gap-4">
        <Link href="/dashboard" className="text-violet-400 hover:text-violet-300 font-medium">
          ← Dashboard
        </Link>
        <Link href="/onboarding" className="text-zinc-400 hover:text-zinc-300">
          Generate more ideas
        </Link>
      </div>
    </div>
  );
}
