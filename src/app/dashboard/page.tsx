import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";
import Link from "next/link";
import RequestMoreForm from "@/components/RequestMoreForm";
import DashboardIdeaActions from "@/components/DashboardIdeaActions";
import SearchFromLikedButton from "@/components/SearchFromLikedButton";

export const dynamic = "force-dynamic";

type DashboardIdea = {
  id: string;
  batch_id: string;
  idea_json: unknown;
  created_at: string;
};

export default async function DashboardPage() {
  const authUser = await getServerUser();
  const db = supabaseServer();

  const { data: appUser } = authUser
    ? await db.from("users").select("id").eq("id", authUser.id).single()
    : { data: null };

  let ideas: DashboardIdea[] = [];
  if (appUser) {
    try {
      const { data } = await db
        .from("ideas")
        .select("id, batch_id, idea_json, created_at")
        .eq("user_id", appUser.id)
        .order("created_at", { ascending: false });
      ideas = (data as DashboardIdea[] | null) ?? [];
    } catch (e) {
      console.error("dashboard: failed to load ideas", e);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <div className="flex flex-col gap-3 mb-4">
        <RequestMoreForm />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-zinc-400">All your ideas in one place.</p>
          <SearchFromLikedButton />
        </div>
      </div>
      {(!authUser || !appUser) && (
        <p className="text-zinc-500 mb-4">Session unavailable. Ideas will appear here once a user is loaded.</p>
      )}
      {ideas.length === 0 ? (
        <p className="text-zinc-500">
          No ideas yet. Request your first 10 ideas above.
        </p>
      ) : (
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
              {ideas.map((idea) => {
                const j = idea.idea_json as Record<string, unknown>;
                const title = String(j.title ?? "Idea");
                const hook = String(j.one_sentence_hook ?? "");
                const difficulty = String(j.difficulty_1_to_5 ?? "—");
                const created = idea.created_at ? new Date(idea.created_at).toLocaleDateString() : "—";
                return (
                  <tr key={idea.id} className="border-t border-zinc-800/80 hover:bg-zinc-900/80 transition-colors">
                    <td className="px-4 py-3 align-top">
                      <Link href={`/idea/${idea.id}`} className="font-medium text-white hover:text-violet-300">
                        {title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 align-top max-w-md">
                      <p className="text-zinc-400 line-clamp-2">{hook}</p>
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap text-zinc-400">{created}</td>
                    <td className="px-4 py-3 align-top whitespace-nowrap text-zinc-400">{difficulty}/5</td>
                    <td className="px-4 py-3 align-top">
                      <DashboardIdeaActions ideaId={idea.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
