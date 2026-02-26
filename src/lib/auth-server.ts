import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Sends a magic link email for the given address via Supabase Auth (server-side).
 * Use after onboarding so the user receives a login link. Does not throw; log errors.
 */
export async function sendMagicLinkServer(email: string): Promise<void> {
  if (!url || !anon) {
    console.error("auth-server: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing");
    return;
  }
  const supabase = createClient(url, anon, { auth: { persistSession: false } });
  const redirectTo = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/loading`
    : undefined;
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: redirectTo },
  });
  if (error) {
    console.error("auth-server: signInWithOtp failed", error.message);
  }
}
