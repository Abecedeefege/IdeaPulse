import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";
import RequestMoreForm from "@/components/RequestMoreForm";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const db = supabaseServer();
  const { data: batches } = await db.from("idea_batches").select("id, scheduled_for_date, created_at").order("created_at", { ascending: false }).limit(5);

  const batchIds = (batches ?? []).map((b) => b.id);
  const { data: ideas } = batchIds.length > 0
    ? await db.from("ideas").select("id, batch_id, idea_json, created_at").in("batch_id", batchIds).order("created_at", { ascending: false })
    : { data: [] };

  const ideaList = (ideas ?? []).slice(0, 20);
  const byBatch = batchIds.length ? (batches ?? []).map((b) => ({ ...b, ideas: ideaList.filter((i) => i.batch_id === b.id) })) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <RequestMoreForm />
      <p className="text-gray-600 mb-6">Your latest batches. Sign up with your email in onboarding to receive ideas.</p>
      {byBatch.length === 0 ? (
        <p className="text-gray-500">No batches yet. <Link href="/onboarding" className="text-gray-900 underline">Sign up</Link> to get your first 10 ideas.</p>
      ) : (
        <div className="space-y-8">
          {byBatch.map((batch) => (
            <section key={batch.id}>
              <h2 className="font-semibold text-gray-900 mb-2">Batch — {new Date(batch.scheduled_for_date).toLocaleDateString()}</h2>
              <ul className="space-y-4">
                {batch.ideas.map((idea) => {
                  const j = idea.idea_json as Record<string, unknown>;
                  return (
                    <li key={idea.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">{String(j.title ?? "Idea")}</h3>
                      <p className="text-sm text-gray-600 mt-1">{String(j.one_sentence_hook ?? "")}</p>
                      <p className="text-sm text-gray-500 mt-2">Difficulty: {String(j.difficulty_1_to_5 ?? "—")}/5</p>
                      <Link href={`/idea/${idea.id}`} className="text-sm text-gray-900 underline mt-2 inline-block">View idea</Link>
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
