import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.redirect(new URL("/?error=missing_email", req.url));
  const db = supabaseServer();
  await db.from("users").update({ unsubscribed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("email", email);
  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  return NextResponse.redirect(new URL("/?unsubscribed=1", base));
}
