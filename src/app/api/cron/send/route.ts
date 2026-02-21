import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";
import { sendBatchEmail } from "@/lib/email";

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(req: NextRequest) {
  if (CRON_SECRET && req.headers.get("authorization") !== `Bearer ${CRON_SECRET}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().slice(0, 10);
  const db = supabaseServer();
  const { data: users } = await db.from("users").select("id, email, email_frequency, profile_json").is("unsubscribed_at", null);
  if (!users?.length) return NextResponse.json({ ok: true, sent: 0 });

  const isSunday = new Date().getDay() === 0;
  let sent = 0;

  for (const user of users) {
    const frequency = user.email_frequency === "daily" ? "daily" : "weekly";
    if (frequency === "weekly" && !isSunday) continue;
    const { count } = await db.from("idea_batches").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("scheduled_for_date", today);
    if (count != null && count >= 1) continue;

    const profile = (user.profile_json as { preference_summary?: string; primary_goal?: string; interests?: string[] }) ?? {};
    const summary = profile.preference_summary || [profile.primary_goal, Array.isArray(profile.interests) ? profile.interests.join(", ") : ""].filter(Boolean).join(". ") || "general audience";

    const { ideas, usage } = await generateIdeas(summary, 10);
    await logRequest({ userId: user.id, kind: "generate_ideas", model: process.env.OPENAI_MODEL_FAST, tokensIn: usage.prompt, tokensOut: usage.completion, costEst: usage.costEst });

    const { data: batch, error: batchError } = await db.from("idea_batches").insert({ user_id: user.id, scheduled_for_date: today }).select("id").single();
    if (batchError || !batch) continue;

    const ideaRows = ideas.map((ideaJson) => ({ batch_id: batch.id, user_id: user.id, idea_json: ideaJson, is_public: true }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) continue;

    const { data: savedIdeas } = await db.from("ideas").select("id, idea_json").eq("batch_id", batch.id).order("created_at");
    await sendBatchEmail(user.email, savedIdeas ?? [], user.id);
    sent++;
  }

  return NextResponse.json({ ok: true, sent });
}
