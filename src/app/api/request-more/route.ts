import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";
import { sendBatchEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const db = supabaseServer();
    const { data: user, error: userError } = await db.from("users").select("id, email, profile_json, unsubscribed_at").eq("email", email).single();
    if (userError || !user) return NextResponse.json({ error: "No account found with this email. Sign up via Onboarding first." }, { status: 404 });
    if (user.unsubscribed_at) return NextResponse.json({ error: "This email has unsubscribed." }, { status: 400 });

    const today = new Date().toISOString().slice(0, 10);
    const { count } = await db.from("idea_batches").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("scheduled_for_date", today);
    if (count != null && count >= 1) return NextResponse.json({ error: "You already received a batch today. Try again tomorrow." }, { status: 429 });

    const profile = (user.profile_json as { preference_summary?: string; primary_goal?: string; interests?: string[] }) ?? {};
    const summary = profile.preference_summary || [profile.primary_goal, Array.isArray(profile.interests) ? profile.interests.join(", ") : ""].filter(Boolean).join(". ") || "general audience";

    const { ideas, usage } = await generateIdeas(summary, 10);
    await logRequest({ userId: user.id, kind: "generate_ideas", model: process.env.OPENAI_MODEL_FAST, tokensIn: usage.prompt, tokensOut: usage.completion, costEst: usage.costEst });

    const { data: batch, error: batchError } = await db.from("idea_batches").insert({ user_id: user.id, scheduled_for_date: today }).select("id").single();
    if (batchError || !batch) return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });

    const ideaRows = ideas.map((ideaJson) => ({ batch_id: batch.id, user_id: user.id, idea_json: ideaJson, is_public: true }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });

    const { data: savedIdeas } = await db.from("ideas").select("id, idea_json").eq("batch_id", batch.id).order("created_at");
    await sendBatchEmail(user.email, savedIdeas ?? [], user.id);
    return NextResponse.json({ ok: true, message: "10 more ideas sent to your inbox." });
  } catch (e) {
    console.error("request-more", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
