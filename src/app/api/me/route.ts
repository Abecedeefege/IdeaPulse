import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

export async function GET() {
  const authUser = await getServerUser();
  if (!authUser) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const db = supabaseServer();
  const { data: user, error } = await db
    .from("users")
    .select("id, email, email_frequency, profile_json")
    .eq("email", authUser.email)
    .single();

  if (error || !user)
    return NextResponse.json({ error: "User not found", email: authUser.email }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    email_frequency: user.email_frequency,
    profile: user.profile_json ?? {},
  });
}
