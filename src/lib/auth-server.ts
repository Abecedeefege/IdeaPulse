import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;

/**
 * Sends a magic link email for the given address via Supabase Auth (server-side).
 * Use after onboarding so the user receives a login link.
 * Returns { ok: false, error } when APP_URL is missing or localhost (do not send link); otherwise returns { ok: true } or { ok: false, error } from Supabase.
 */
export async function sendMagicLinkServer(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!url || !anon) {
    console.error("auth-server: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing");
    return { ok: false, error: "Auth not configured" };
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!appUrl || LOCALHOST_PATTERN.test(appUrl)) {
    console.error("auth-server: NEXT_PUBLIC_APP_URL is missing or localhost; refusing to send magic link");
    return { ok: false, error: "APP_URL_NOT_SET" };
  }
  const redirectTo = `${appUrl}/loading`;
  const supabase = createClient(url, anon, { auth: { persistSession: false } });
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: redirectTo },
  });
  if (error) {
    console.error("auth-server: signInWithOtp failed", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
