import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { verifyActionToken } from "@/lib/signed-links";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "feedback") return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  return NextResponse.redirect(new URL(`/feedback?ideaId=${payload.ideaId}&token=${encodeURIComponent(token)}`, base));
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? (await req.json().then((b) => b?.token).catch(() => null));
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "feedback") return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  const contentText = typeof body.content === "string" ? body.content.slice(0, 2000) : "";
  const db = supabaseServer();
  await db.from("interactions").insert({ user_id: payload.userId, idea_id: payload.ideaId, type: "feedback", content_text: contentText || null });
  return NextResponse.json({ ok: true });
}
