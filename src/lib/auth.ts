import { supabaseBrowser } from "@/lib/supabase";

export async function signInWithMagicLink(email: string, redirectPath?: string) {
  const supabase = supabaseBrowser();
  const base = process.env.NEXT_PUBLIC_APP_URL;
  const redirectTo = base ? `${base}${redirectPath || "/dashboard"}` : undefined;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  if (error) throw error;
}
