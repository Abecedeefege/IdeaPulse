import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";
import { profileUpdateSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const authUser = await getServerUser();
    if (!authUser) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = profileUpdateSchema.safeParse(body);
    const profile = parsed.success && parsed.data.profile ? parsed.data.profile : {};

    const db = supabaseServer();
    const { data: appUser, error: userError } = await db
      .from("users")
      .select("id, email, profile_json")
      .eq("email", authUser.email)
      .single();
    if (userError || !appUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const today = new Date().toISOString().slice(0, 10);
    const { count } = await db.from("idea_batches").select("id", { count: "exact", head: true }).eq("user_id", appUser.id).eq("scheduled_for_date", today);
    if (count != null && count >= 1) return NextResponse.json({ error: "You already received a batch today. Try again tomorrow." }, { status: 429 });

    const profileJson = profile as { primary_goal?: string; constraints?: Record<string, string>; interests?: string[] };
    const summary = [profileJson.primary_goal, profileJson.constraints && typeof profileJson.constraints === "object" ? Object.values(profileJson.constraints).filter(Boolean).join(", ") : "", Array.isArray(profileJson.interests) ? profileJson.interests.join(", ") : ""].filter(Boolean).join(". ") || "general audience";

    const { ideas, usage } = await generateIdeas(summary, 10);
    await logRequest({ userId: appUser.id, kind: "generate_ideas", model: process.env.OPENAI_MODEL_FAST, tokensIn: usage.prompt, tokensOut: usage.completion, costEst: usage.costEst });

    const { data: batch, error: batchError } = await db.from("idea_batches").insert({ user_id: appUser.id, scheduled_for_date: today }).select("id").single();
    if (batchError || !batch) return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });

    const ideaRows = ideas.map((ideaJson) => ({ batch_id: batch.id, user_id: appUser.id, idea_json: ideaJson, is_public: true }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("generate-batch", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
