import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { verifyActionToken } from "@/lib/signed-links";
import { feedbackSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "feedback") return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  return NextResponse.redirect(new URL(`/feedback?ideaId=${payload.ideaId}&token=${encodeURIComponent(token)}`, base));
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? (await req.clone().json().then((b: Record<string, unknown>) => b?.token as string).catch(() => null));
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "feedback") return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const db = supabaseServer();
  await db.from("interactions").insert({ user_id: payload.userId, idea_id: payload.ideaId, type: "feedback", content_text: parsed.data.content });
  return NextResponse.json({ ok: true });
}
