import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";
import RequestMoreForm from "@/components/RequestMoreForm";
import SearchFromLikedButton from "@/components/SearchFromLikedButton";
import DashboardIdeasClient from "@/components/DashboardIdeasClient";

export const dynamic = "force-dynamic";

type DashboardIdea = {
  id: string;
  batch_id: string;
  idea_json: unknown;
  created_at: string;
  slug: string | null;
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
        .select("id, batch_id, idea_json, created_at, slug")
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
        <p className="text-sm text-zinc-500">
          Like ideas you think are good to improve the next batch of ideas. Delete the ones you think are bad.
        </p>
      </div>
      {(!authUser || !appUser) && (
        <p className="text-zinc-500 mb-4">Session unavailable. Ideas will appear here once a user is loaded.</p>
      )}
      <DashboardIdeasClient initialIdeas={ideas} />
    </div>
  );
}
