import { createClient } from "@supabase/supabase-js";

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;

/**
 * Send a magic-link email via Supabase's built-in signInWithOtp.
 * Uses the anon key so Supabase handles email delivery (via configured SMTP).
 */
export async function sendMagicLinkServer(
  email: string,
  redirectPath: string = "/ideas",
): Promise<{ ok: boolean; error?: string }> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!appUrl || LOCALHOST_PATTERN.test(appUrl)) {
    console.error("auth-server: NEXT_PUBLIC_APP_URL is missing or localhost");
    return { ok: false, error: "APP_URL_NOT_SET" };
  }

  const redirectTo = `${appUrl}/auth/callback?next=${encodeURIComponent(redirectPath)}`;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } },
    );

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      console.error("auth-server: signInWithOtp failed", error.message);
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (e) {
    console.error("auth-server: unexpected error", e);
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}
