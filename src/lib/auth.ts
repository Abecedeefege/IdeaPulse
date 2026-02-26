import { supabaseBrowser } from "@/lib/supabase";

export async function signInWithMagicLink(email: string) {
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/profile`
        : undefined,
    },
  });
  if (error) throw error;
}

