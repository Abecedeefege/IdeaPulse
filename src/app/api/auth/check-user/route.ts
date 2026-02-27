import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const db = supabaseServer();
    const { data } = await db.from("users").select("id").eq("email", email).maybeSingle();

    return NextResponse.json({ exists: !!data });
  } catch (e) {
    console.error("check-user", e);
    return NextResponse.json({ exists: false });
  }
}
