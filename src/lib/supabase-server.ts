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
 * Returns the app `users` row for the current Supabase Auth user.
 * Returns null for anonymous visitors (no auth session).
 * Falls back to bypass email only when BYPASS_AUTH_EMAIL is set (dev convenience).
 */
export async function getServerUser(): Promise<{ id: string; email: string } | null> {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  const { ensureAppUserExists } = await import("@/lib/ensure-app-user");

  if (!error && user?.email) {
    return ensureAppUserExists(user.email);
  }

  // In development, allow bypass auth for testing
  const bypassEmail = process.env.BYPASS_AUTH_EMAIL?.trim();
  if (bypassEmail) {
    return ensureAppUserExists(bypassEmail);
  }

  // Anonymous visitor — no user record
  return null;
}
