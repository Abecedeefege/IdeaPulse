import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

function checkEnv(): string | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return "Supabase";
  return null;
}

export async function GET(req: Request) {
  try {
    const envError = checkEnv();
    if (envError) return NextResponse.json({ error: `Server not configured: ${envError}` }, { status: 503 });

    const url = new URL(req.url);
    const email = url.searchParams.get("email")?.trim();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const db = supabaseServer();
    const { data: user, error } = await db
      .from("users")
      .select("id, email, email_frequency, profile_json")
      .eq("email", email)
      .single();

    if (error || !user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      email_frequency: user.email_frequency,
      profile: user.profile_json ?? {},
    });
  } catch (e) {
    console.error("profile GET", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const envError = checkEnv();
    if (envError) return NextResponse.json({ error: `Server not configured: ${envError}` }, { status: 503 });

    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const emailFrequency = body.email_frequency === "daily" ? "daily" : "weekly";
    const profile = body.profile && typeof body.profile === "object" ? body.profile : {};

    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const db = supabaseServer();
    const profileJson = {
      primary_goal: profile.primary_goal,
      constraints: profile.constraints,
      interests: profile.interests,
      preference_summary: profile.preference_summary ?? "",
    };

    const { data: existing } = await db
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (!existing) {
      const { data: newUser, error: insertError } = await db
        .from("users")
        .insert({ email, email_frequency: emailFrequency, profile_json: profileJson })
        .select("id")
        .single();
      if (insertError || !newUser) return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
      return NextResponse.json({ ok: true, id: newUser.id });
    }

    const { error: updateError } = await db
      .from("users")
      .update({
        email_frequency: emailFrequency,
        profile_json: profileJson,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (updateError) return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });

    return NextResponse.json({ ok: true, id: existing.id });
  } catch (e) {
    console.error("profile POST", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

