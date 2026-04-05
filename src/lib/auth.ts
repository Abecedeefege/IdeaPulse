import { supabaseBrowser } from "@/lib/supabase";

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;

export async function signInWithMagicLink(email: string, redirectPath?: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!base || LOCALHOST_PATTERN.test(base)) {
    throw new Error("App URL not set. Please try again later.");
  }
  const finalPath = redirectPath?.startsWith("/") ? redirectPath : `/${redirectPath || "dashboard"}`;
  const redirectTo = `${base}/auth/callback?next=${encodeURIComponent(finalPath)}`;
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  if (error) {
    console.error("[auth] signInWithMagicLink failed:", error.message, error);
    throw error;
  }
}
