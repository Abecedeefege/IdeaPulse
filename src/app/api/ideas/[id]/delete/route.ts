import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getServerUser();
    if (!authUser) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { id: ideaId } = await params;
    if (!ideaId) {
      return NextResponse.json({ error: "Missing idea id" }, { status: 400 });
    }

    const db = supabaseServer();
    const { data: appUser, error: userError } = await db
      .from("users")
      .select("id")
      .eq("id", authUser.id)
      .single();

    if (userError || !appUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data: idea, error: ideaError } = await db
      .from("ideas")
      .select("id, user_id")
      .eq("id", ideaId)
      .single();

    if (ideaError || !idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    if (idea.user_id !== appUser.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { error: deleteError } = await db.from("ideas").delete().eq("id", ideaId);
    if (deleteError) {
      return NextResponse.json({ error: "Failed to delete idea" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("delete-idea", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

