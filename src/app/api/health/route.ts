import { NextResponse } from "next/server";

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;

/**
 * GET /api/health
 * Returns whether NEXT_PUBLIC_APP_URL is set and not localhost (for production).
 * Useful to spot misconfiguration without sending an email.
 */
export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const ok = !!appUrl && !LOCALHOST_PATTERN.test(appUrl);
  return NextResponse.json({
    app_url_set: !!appUrl,
    app_url_valid: ok,
    message: ok ? "APP_URL is configured for production" : "APP_URL is missing or localhost",
  });
}
