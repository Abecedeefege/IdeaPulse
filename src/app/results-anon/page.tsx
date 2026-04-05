import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnonResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const { batch: batchIdParam } = await searchParams;

  if (!batchIdParam) {
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

  const db = supabaseServer();
  const { data: ideasData } = await db
    .from("ideas")
    .select("id, idea_json, slug, created_at")
    .eq("batch_id", batchIdParam)
    .order("created_at");

  const list = ideasData ?? [];

  if (list.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-2xl font-bold text-white mb-4">No ideas found</h1>
        <p className="text-zinc-400 mb-6">
          We couldn&apos;t find ideas for this batch. They may have expired or the link is invalid.
        </p>
        <Link href="/onboarding" className="text-violet-400 hover:text-violet-300 font-medium">
          Generate new ideas →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 rounded-xl border border-violet-500/50 bg-violet-500/10 p-4 text-center">
        <p className="text-sm text-zinc-300 mb-2">
          <strong>Claim your account to store your ideas.</strong>{" "}
          Get <strong>20 ideas per day</strong> and save them to your dashboard.
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
        {list.map((idea) => {
          const j = idea.idea_json as Record<string, unknown>;
          const title = String(j.title ?? "Idea");
          const hook = String(j.one_sentence_hook ?? "");
          const difficulty = String(j.difficulty_1_to_5 ?? "—");
          const href = `/idea/${idea.slug || idea.id}`;
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
              <div className="mt-3">
                <Link href={href} className="text-sm text-violet-400 hover:text-violet-300">
                  View idea →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <Link href="/onboarding" className="text-zinc-400 hover:text-zinc-300">
          ← Back to Idea Hub
        </Link>
      </div>
    </div>
  );
}
