import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Ignored in Server Components; middleware can handle refresh
        }
      },
    },
  });
}

/**
 * Returns the app `users` row for the current Supabase Auth user, or the bypass email user.
 * Ensures a `users` row exists (service role) so anonymous/bypass traffic always has an account.
 */
export async function getServerUser(): Promise<{ id: string; email: string } | null> {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  const { ensureAppUserExists } = await import("@/lib/ensure-app-user");

  if (!error && user?.email) {
    return ensureAppUserExists(user.email);
  }

  const defaultEmail = process.env.BYPASS_AUTH_EMAIL?.trim() || "pulse@itamoa.com";
  return ensureAppUserExists(defaultEmail);
}
