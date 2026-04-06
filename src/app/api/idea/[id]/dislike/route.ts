import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";
import { verifyActionToken } from "@/lib/signed-links";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "dislike") return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const db = supabaseServer();
  await db.from("interactions").insert({ user_id: payload.userId, idea_id: payload.ideaId, type: "dislike", content_text: null });
  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  return NextResponse.redirect(new URL(`/dashboard?disliked=${payload.ideaId}`, base));
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authUser = await getServerUser();
  if (!authUser) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { id: ideaId } = await params;
  const db = supabaseServer();
  const { data: appUser } = await db.from("users").select("id, profile_json").eq("id", authUser.id).single();
  if (!appUser) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const { data: ideaRow } = await db.from("ideas").select("user_id, idea_json").eq("id", ideaId).single();
  if (!ideaRow) return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  const profile = (appUser.profile_json as { plan?: string; preference_summary?: string }) ?? {};
  const isOwnIdea = ideaRow.user_id === appUser.id;
  if (!isOwnIdea && profile.plan !== "pro" && profile.plan !== "team") {
    const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    return NextResponse.json({ error: "Paid feature", redirect: `${base}/pricing` }, { status: 402 });
  }
  await db.from("interactions").insert({ user_id: appUser.id, idea_id: ideaId, type: "dislike", content_text: null });
  return NextResponse.json({ ok: true });
}
