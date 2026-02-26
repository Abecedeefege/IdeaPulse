import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";
import { sendBatchEmail } from "@/lib/email";
import { sendMagicLinkServer } from "@/lib/auth-server";

function checkEnv(): string | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return "Supabase (add NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in Vercel)";
  if (!process.env.OPENAI_API_KEY) return "OpenAI (add OPENAI_API_KEY in Vercel)";
  if (!process.env.RESEND_API_KEY) return "Resend (add RESEND_API_KEY in Vercel)";
  return null;
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
    let { data: user, error: userError } = await db
      .from("users")
      .select("id, email, profile_json, unsubscribed_at")
      .eq("email", email)
      .single();

    // If lookup fails, log but continue as if user doesn't exist.
    if (userError && !user) {
      console.error("onboarding: user lookup error", userError);
      user = null as any;
    }

    const profileJson = { primary_goal: profile.primary_goal, constraints: profile.constraints, interests: profile.interests, preference_summary: "" };

    if (!user) {
      const { data: newUser, error: insertError } = await db
        .from("users")
        .insert({ email, email_frequency: emailFrequency, profile_json: profileJson })
        .select("id")
        .single();

      if (insertError) {
        // If a user with this email was just created (unique violation), load it and continue.
        const code = (insertError as any).code;
        if (code === "23505" || code === "PGRST116") {
          const { data: existing } = await db
            .from("users")
            .select("id, email, profile_json, unsubscribed_at")
            .eq("email", email)
            .single();
          if (existing) {
            user = existing;
          } else {
            return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
          }
        } else {
          console.error("onboarding: insert user error", insertError);
          return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
        }
      } else {
        user = { id: newUser.id, email, profile_json: profileJson, unsubscribed_at: null };
      }
    } else {
      await db.from("users").update({ email_frequency: emailFrequency, profile_json: profileJson, unsubscribed_at: null, updated_at: new Date().toISOString() }).eq("id", user.id);
    }

    const userId = user.id;
    const today = new Date().toISOString().slice(0, 10);
    const { count } = await db.from("idea_batches").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("scheduled_for_date", today);
    if (count != null && count >= 1) return NextResponse.json({ ok: true, message: "You're already set up. Check your inbox or dashboard." });

    const summary = [profileJson.preference_summary, profileJson.primary_goal, Array.isArray(profileJson.interests) ? profileJson.interests.join(", ") : ""].filter(Boolean).join(". ") || "general audience";
    const { ideas, usage } = await generateIdeas(summary, 10);
    await logRequest({ userId, kind: "generate_ideas", model: process.env.OPENAI_MODEL_FAST, tokensIn: usage.prompt, tokensOut: usage.completion, costEst: usage.costEst });

    const { data: batch, error: batchError } = await db.from("idea_batches").insert({ user_id: userId, scheduled_for_date: today }).select("id").single();
    if (batchError || !batch) return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });

    const ideaRows = ideas.map((ideaJson) => ({ batch_id: batch.id, user_id: userId, idea_json: ideaJson, is_public: true }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });

    const { data: savedIdeas } = await db.from("ideas").select("id, idea_json").eq("batch_id", batch.id).order("created_at");
    await sendBatchEmail(email, savedIdeas ?? [], userId);
    sendMagicLinkServer(email).catch((e) => console.error("onboarding: magic link", e));
    return NextResponse.json({ ok: true, message: "Check your inbox for your first batch of ideas." });
  } catch (e) {
    console.error("onboarding", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
