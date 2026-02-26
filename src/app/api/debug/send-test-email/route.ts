import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/debug/send-test-email
 * Body: { "to": "you@example.com" }
 * Sends (1) Resend test email and (2) Supabase magic link to that address.
 * In production, guard with a secret or disable.
 */
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.DEBUG_EMAIL_CHECK_SECRET;
    if (!secret || authHeader !== `Bearer ${secret}`)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let to: string;
  try {
    const body = await req.json();
    to = typeof body?.to === "string" ? body.to.trim() : "";
  } catch {
    to = "";
  }
  if (!to) return NextResponse.json({ error: "Body must include { to: 'email@example.com' }" }, { status: 400 });

  const resendResult: { status: string; error?: string } = { status: "skipped" };
  const supabaseResult: { status: string; error?: string } = { status: "skipped" };

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.EMAIL_FROM || "IdeaPulse <onboarding@resend.dev>";
      const { error } = await resend.emails.send({
        from,
        to: [to],
        subject: "IdeaPulse test email",
        html: "<p>Resend is working. Check your inbox (and spam).</p>",
      });
      if (error) {
        resendResult.status = "error";
        resendResult.error = error.message;
      } else {
        resendResult.status = "sent";
      }
    } catch (e) {
      resendResult.status = "exception";
      resendResult.error = e instanceof Error ? e.message : String(e);
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && anon) {
    try {
      const supabase = createClient(url, anon, { auth: { persistSession: false } });
      const redirectTo = process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
        : undefined;
      const { error } = await supabase.auth.signInWithOtp({
        email: to,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) {
        supabaseResult.status = "error";
        supabaseResult.error = error.message;
      } else {
        supabaseResult.status = "sent";
      }
    } catch (e) {
      supabaseResult.status = "exception";
      supabaseResult.error = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    to,
    resend: resendResult,
    supabase: supabaseResult,
  });
}
