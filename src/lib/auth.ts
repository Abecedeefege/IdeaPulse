import { supabaseBrowser } from "@/lib/supabase";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://idea-pulse-chi.vercel.app";

export async function signInWithMagicLink(email: string, redirectPath?: string) {
  const supabase = supabaseBrowser();
  const redirectTo = `${APP_URL}${redirectPath || "/dashboard"}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  if (error) throw error;
}
