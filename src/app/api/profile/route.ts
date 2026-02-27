import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { getServerUser } from "@/lib/supabase-server";

export async function GET() {
  const authUser = await getServerUser();
  if (!authUser) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  try {
    const db = supabaseServer();
    const { data: user, error } = await db
      .from("users")
      .select("id, email, email_frequency, profile_json")
      .eq("email", authUser.email)
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
  const authUser = await getServerUser();
  if (!authUser) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  try {
    const body = await req.json();
    const emailFrequency = body.email_frequency === "daily" ? "daily" : "weekly";
    const profile = body.profile && typeof body.profile === "object" ? body.profile : {};

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
      .eq("email", authUser.email)
      .maybeSingle();

    if (!existing) {
      const { data: newUser, error: insertError } = await db
        .from("users")
        .insert({ email: authUser.email, email_frequency: emailFrequency, profile_json: profileJson })
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
