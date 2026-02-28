import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { generateIdeas, logRequest } from "@/lib/openai";
import { sendBatchEmail } from "@/lib/email";
import { sendMagicLinkServer } from "@/lib/auth-server";
import { onboardingSchema } from "@/lib/validation";

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
    const parsed = onboardingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }

    const { email, email_frequency: emailFrequency, profile, context: contextInput } = parsed.data;

    const db = supabaseServer();
    let user: { id: string; email: string; profile_json: unknown; unsubscribed_at: string | null } | null = null;

    const { data: existingUser, error: userError } = await db
      .from("users")
      .select("id, email, profile_json, unsubscribed_at")
      .eq("email", email)
      .single();

    if (userError && !existingUser) {
      console.error("onboarding: user lookup error", userError);
    } else {
      user = existingUser;
    }

    const profileJson = { primary_goal: profile.primary_goal, constraints: profile.constraints, interests: profile.interests, preference_summary: "" };

    if (!user) {
      const { data: newUser, error: insertError } = await db
        .from("users")
        .insert({ email, email_frequency: emailFrequency, profile_json: profileJson })
        .select("id")
        .single();

      if (insertError) {
        const code = typeof insertError === "object" && insertError !== null && "code" in insertError
          ? String((insertError as unknown as Record<string, unknown>).code)
          : "";
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
      } else if (newUser) {
        user = { id: newUser.id, email, profile_json: profileJson, unsubscribed_at: null };
      }
    } else {
      await db.from("users").update({ email_frequency: emailFrequency, profile_json: profileJson, unsubscribed_at: null, updated_at: new Date().toISOString() }).eq("id", user.id);
    }

    if (!user) return NextResponse.json({ error: "Failed to create user" }, { status: 500 });

    const userId = user.id;
    const today = new Date().toISOString().slice(0, 10);
    const { count } = await db.from("idea_batches").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("scheduled_for_date", today);
    if (count != null && count >= 1) return NextResponse.json({ ok: true, message: "You're already set up. Check your inbox or dashboard." });

    const summary = (contextInput && contextInput.trim())
      ? contextInput.trim()
      : [profileJson.preference_summary, profileJson.primary_goal, Array.isArray(profileJson.interests) ? profileJson.interests.join(", ") : ""].filter(Boolean).join(". ") || "general audience";
    const { ideas, usage } = await generateIdeas(summary, 10);
    await logRequest({ userId, kind: "generate_ideas", model: process.env.OPENAI_MODEL_FAST, tokensIn: usage.prompt, tokensOut: usage.completion, costEst: usage.costEst });

    const { data: batch, error: batchError } = await db.from("idea_batches").insert({ user_id: userId, scheduled_for_date: today }).select("id").single();
    if (batchError || !batch) return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });

    const ideaRows = ideas.map((ideaJson) => ({ batch_id: batch.id, user_id: userId, idea_json: ideaJson, is_public: true }));
    const { error: ideasError } = await db.from("ideas").insert(ideaRows);
    if (ideasError) return NextResponse.json({ error: "Failed to save ideas" }, { status: 500 });

    const { data: savedIdeas } = await db.from("ideas").select("id, idea_json").eq("batch_id", batch.id).order("created_at");
    await sendBatchEmail(email, savedIdeas ?? [], userId);
    const magicResult = await sendMagicLinkServer(email);
    if (!magicResult.ok && magicResult.error === "APP_URL_NOT_SET") {
      return NextResponse.json(
        { error: "Email is not configured for this environment. Please try again later or contact support." },
        { status: 503 }
      );
    }
    if (!magicResult.ok) {
      console.error("onboarding: magic link failed", magicResult.error);
    }
    return NextResponse.json({ ok: true, message: "Check your inbox for your first batch of ideas." });
  } catch (e) {
    console.error("onboarding", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
