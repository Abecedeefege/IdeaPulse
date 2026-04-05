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
  is_liked: boolean;
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
      // Fetch ideas excluding soft-deleted ones
      const { data } = await db
        .from("ideas")
        .select("id, batch_id, idea_json, created_at, slug")
        .eq("user_id", appUser.id)
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      // Fetch liked idea IDs for this user
      const { data: likedInteractions } = await db
        .from("interactions")
        .select("idea_id")
        .eq("user_id", appUser.id)
        .eq("type", "like");

      const likedSet = new Set((likedInteractions ?? []).map((i) => i.idea_id));

      // Map ideas with is_liked flag
      const rawIdeas = (data ?? []) as { id: string; batch_id: string; idea_json: unknown; created_at: string; slug: string | null }[];
      ideas = rawIdeas.map((idea) => ({
        ...idea,
        is_liked: likedSet.has(idea.id),
      }));

      // Sort: liked first, then by difficulty ascending
      ideas.sort((a, b) => {
        if (a.is_liked !== b.is_liked) return a.is_liked ? -1 : 1;
        const aDiff = Number((a.idea_json as Record<string, unknown>)?.difficulty_1_to_5 ?? 5);
        const bDiff = Number((b.idea_json as Record<string, unknown>)?.difficulty_1_to_5 ?? 5);
        return aDiff - bDiff;
      });
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
