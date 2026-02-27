import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";
import Link from "next/link";
import RequestMoreForm from "@/components/RequestMoreForm";
import IdeaLikeDislike from "@/components/IdeaLikeDislike";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const authUser = await getServerUser();
  let userId: string | null = null;
  if (authUser) {
    const db = supabaseServer();
    const { data: appUser } = await db.from("users").select("id").eq("email", authUser.email).single();
    userId = appUser?.id ?? null;
  }

  let byBatch: { id: string; scheduled_for_date: string; created_at?: string; ideas: { id: string; batch_id: string; idea_json: unknown; created_at?: string }[] }[] = [];
  if (userId) {
    try {
      const db = supabaseServer();
      const { data: batches } = await db
        .from("idea_batches")
        .select("id, scheduled_for_date, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      const batchIds = (batches ?? []).map((b) => b.id);
      const { data: ideas } =
        batchIds.length > 0
          ? await db.from("ideas").select("id, batch_id, idea_json, created_at").in("batch_id", batchIds).order("created_at", { ascending: false }).limit(20)
          : { data: [] };

      byBatch =
        batchIds.length > 0
          ? (batches ?? []).map((b) => ({ ...b, ideas: (ideas ?? []).filter((i) => i.batch_id === b.id) }))
          : [];
    } catch (e) {
      console.error("dashboard: failed to load batches", e);
    }
  }

  if (!authUser) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
        <p className="text-zinc-400 mb-6">
          Log in or sign up to see your ideas and batches.
        </p>
        <div className="flex gap-4">
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
            Log in
          </Link>
          <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <RequestMoreForm />
      <p className="text-zinc-400 mb-6">Your latest batches. Sign up with your email in onboarding to receive ideas.</p>
      {byBatch.length === 0 ? (
        <p className="text-zinc-500">
          No batches yet. <Link href="/signup" className="text-violet-400 hover:text-violet-300">Sign up</Link> to get your first 10 ideas.
        </p>
      ) : (
        <div className="space-y-8">
          {byBatch.map((batch) => (
            <section key={batch.id}>
              <h2 className="font-semibold text-white mb-2">Batch — {new Date(batch.scheduled_for_date).toLocaleDateString()}</h2>
              <ul className="space-y-4">
                {batch.ideas.map((idea) => {
                  const j = idea.idea_json as Record<string, unknown>;
                  return (
                    <li key={idea.id} className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
                      <h3 className="font-medium text-white">{String(j.title ?? "Idea")}</h3>
                      <p className="text-sm text-zinc-400 mt-1">{String(j.one_sentence_hook ?? "")}</p>
                      <p className="text-sm text-zinc-500 mt-2">Difficulty: {String(j.difficulty_1_to_5 ?? "—")}/5</p>
                      <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
                        <IdeaLikeDislike ideaId={idea.id} />
                        <Link href={`/idea/${idea.id}`} className="text-sm text-violet-400 hover:text-violet-300">
                          View idea →
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
