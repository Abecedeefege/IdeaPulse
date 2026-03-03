import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://idea-pulse-chi.vercel.app";

export async function sendMagicLinkServer(email: string, redirectPath?: string): Promise<void> {
  if (!url || !anon) {
    console.error("auth-server: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing");
    return;
  }
  const supabase = createClient(url, anon, { auth: { persistSession: false } });
  const redirectTo = `${APP_URL}${redirectPath || "/loading"}`;
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: redirectTo },
  });
  if (error) {
    console.error("auth-server: signInWithOtp failed", error.message);
  }
}
