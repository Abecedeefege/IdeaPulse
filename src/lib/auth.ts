import { supabaseBrowser } from "@/lib/supabase";

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;

export async function signInWithMagicLink(email: string, redirectPath?: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!base || LOCALHOST_PATTERN.test(base)) {
    throw new Error("App URL not set. Please try again later.");
  }
  const path = redirectPath?.startsWith("/") ? redirectPath : `/${redirectPath || "dashboard"}`;
  const redirectTo = `${base}${path}`;
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  if (error) throw error;
}
