import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

/**
 * GET /api/debug/email-check
 * Returns env presence (no secrets). Optional ?to=email sends a test Resend email.
 * In production, guard with ?key=SECRET or disable.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    if (key !== process.env.DEBUG_EMAIL_CHECK_SECRET)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const report: Record<string, boolean | string> = {
    RESEND_API_KEY: !!RESEND,
    EMAIL_FROM: !!EMAIL_FROM,
    EMAIL_FROM_value: EMAIL_FROM || "",
    NEXT_PUBLIC_SUPABASE_URL: !!SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!SUPABASE_ANON,
    NEXT_PUBLIC_APP_URL: !!APP_URL,
    NEXT_PUBLIC_APP_URL_value: APP_URL || "",
  };

  const to = new URL(req.url).searchParams.get("to")?.trim();
  if (to) {
    try {
      const resend = new Resend(RESEND || undefined);
      const from = EMAIL_FROM || "IdeaPulse <onboarding@resend.dev>";
      const { data, error } = await resend.emails.send({
        from,
        to: [to],
        subject: "IdeaPulse email check",
        html: "<p>If you see this, Resend is working.</p>",
      });
      if (error) {
        report.test_resend = "error";
        report.test_resend_error = error.message;
      } else {
        report.test_resend = "sent";
        report.test_resend_id = (data as { id?: string })?.id ?? "";
      }
    } catch (e: unknown) {
      report.test_resend = "exception";
      report.test_resend_error = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json(report);
}
