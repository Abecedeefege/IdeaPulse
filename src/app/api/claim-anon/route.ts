import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

/**
 * POST /api/claim-anon
 *
 * Transfers ideas and batches from an anonymous user to the authenticated user,
 * then deletes the anonymous user record. Called after signup/login when the
 * client has an anon_id in localStorage.
 */
export async function POST(req: Request) {
  try {
    const authUser = await getServerUser();
    if (!authUser) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const anonId = typeof body.anonId === "string" ? body.anonId.trim() : "";

    if (!anonId) {
      return NextResponse.json({ ok: true, claimedCount: 0 });
    }

    const db = supabaseServer();

    // Find the anonymous user by anonymous_id
    const { data: anonUser } = await db
      .from("users")
      .select("id")
      .eq("anonymous_id", anonId)
      .maybeSingle();

    if (!anonUser?.id) {
      return NextResponse.json({ ok: true, claimedCount: 0 });
    }

    // Don't transfer to self (edge case: same user)
    if (anonUser.id === authUser.id) {
      return NextResponse.json({ ok: true, claimedCount: 0 });
    }

    // Count ideas to transfer
    const { count } = await db
      .from("ideas")
      .select("id", { count: "exact", head: true })
      .eq("user_id", anonUser.id);

    const claimedCount = count ?? 0;

    // Transfer idea batches to the authenticated user
    await db
      .from("idea_batches")
      .update({ user_id: authUser.id })
      .eq("user_id", anonUser.id);

    // Transfer ideas to the authenticated user
    await db
      .from("ideas")
      .update({ user_id: authUser.id })
      .eq("user_id", anonUser.id);

    // Transfer any interactions
    await db
      .from("interactions")
      .update({ user_id: authUser.id })
      .eq("user_id", anonUser.id);

    // Delete the anonymous user record (user_plans cascades via ON DELETE CASCADE)
    await db
      .from("user_plans")
      .delete()
      .eq("user_id", anonUser.id);

    await db
      .from("users")
      .delete()
      .eq("id", anonUser.id);

    return NextResponse.json({ ok: true, claimedCount });
  } catch (e) {
    console.error("claim-anon", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
