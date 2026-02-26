import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";
import { verifyActionToken } from "@/lib/signed-links";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "like") return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const db = supabaseServer();
  await db.from("interactions").insert({ user_id: payload.userId, idea_id: payload.ideaId, type: "like", content_text: null });
  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  return NextResponse.redirect(new URL(`/dashboard?liked=${payload.ideaId}`, base));
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authUser = await getServerUser();
  if (!authUser) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { id: ideaId } = await params;
  const db = supabaseServer();
  const { data: appUser } = await db.from("users").select("id, profile_json").eq("email", authUser.email).single();
  if (!appUser) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const profile = (appUser.profile_json as { plan?: string; preference_summary?: string }) ?? {};
  if (profile.plan !== "pro" && profile.plan !== "team") {
    const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    return NextResponse.json({ error: "Paid feature", redirect: `${base}/pricing` }, { status: 402 });
  }
  const { data: idea } = await db.from("ideas").select("idea_json").eq("id", ideaId).single();
  await db.from("interactions").insert({ user_id: appUser.id, idea_id: ideaId, type: "like", content_text: null });
  const title = idea?.idea_json && typeof idea.idea_json === "object" && "title" in idea.idea_json ? String((idea.idea_json as { title: string }).title) : "";
  const prev = profile.preference_summary || "";
  const added = title ? `Liked: ${title}. ` : "";
  const updatedProfile = { ...profile, preference_summary: (prev + added).trim().slice(0, 2000) };
  await db.from("users").update({
    profile_json: updatedProfile,
    updated_at: new Date().toISOString(),
  }).eq("id", appUser.id);
  return NextResponse.json({ ok: true });
}
