import { supabaseServer } from "@/lib/supabase";

const MAX_PROFILE_LENGTH = 200;
const REBUILD_EVERY_N = 5;

/**
 * Checks if idea_profile should be rebuilt (every Nth like/delete interaction).
 * If so, rebuilds it using gpt-4o-mini for a cheap ~30-word summary.
 */
export async function maybeRebuildIdeaProfile(userId: string): Promise<void> {
  const db = supabaseServer();

  // Count total likes + deletes to see if we hit a multiple of REBUILD_EVERY_N
  const { count: likeCount } = await db
    .from("interactions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("type", "like");

  const { count: deleteCount } = await db
    .from("ideas")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_deleted", true);

  const total = (likeCount ?? 0) + (deleteCount ?? 0);
  if (total === 0 || total % REBUILD_EVERY_N !== 0) return;

  await rebuildIdeaProfile(userId);
}

/**
 * Rebuilds the idea_profile using gpt-4o-mini summarization.
 */
export async function rebuildIdeaProfile(userId: string): Promise<void> {
  const db = supabaseServer();

  // Get last 20 liked idea titles
  const { data: likedInteractions } = await db
    .from("interactions")
    .select("idea_id")
    .eq("user_id", userId)
    .eq("type", "like")
    .order("created_at", { ascending: false })
    .limit(20);

  const likedIdeaIds = (likedInteractions ?? []).map((i) => i.idea_id);
  let likedTitles: string[] = [];
  if (likedIdeaIds.length > 0) {
    const { data: likedIdeas } = await db
      .from("ideas")
      .select("idea_json")
      .in("id", likedIdeaIds);
    likedTitles = (likedIdeas ?? []).map((i) => {
      const j = i.idea_json as Record<string, unknown>;
      return String(j.title ?? "");
    }).filter(Boolean);
  }

  // Get last 20 deleted idea titles
  const { data: deletedIdeas } = await db
    .from("ideas")
    .select("idea_json")
    .eq("user_id", userId)
    .eq("is_deleted", true)
    .order("created_at", { ascending: false })
    .limit(20);

  const deletedTitles = (deletedIdeas ?? []).map((i) => {
    const j = i.idea_json as Record<string, unknown>;
    return String(j.title ?? "");
  }).filter(Boolean);

  if (likedTitles.length === 0 && deletedTitles.length === 0) return;

  // Use gpt-4o-mini for a cheap summarization
  try {
    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `Summarize in under 30 words what this user likes and dislikes based on their idea interactions.
Liked: ${likedTitles.join(", ") || "none"}
Deleted: ${deletedTitles.join(", ") || "none"}
Format: "Likes: ... Dislikes: ..."`;

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const profile = (res.choices?.[0]?.message?.content ?? "").trim().slice(0, MAX_PROFILE_LENGTH);

    if (profile) {
      await db
        .from("users")
        .update({ idea_profile: profile, updated_at: new Date().toISOString() })
        .eq("id", userId);
    }
  } catch (e) {
    console.error("rebuildIdeaProfile: failed", e);
    // Non-critical — don't throw
  }
}
