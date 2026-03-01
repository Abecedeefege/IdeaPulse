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
 * Returns the current Supabase Auth user if session exists; otherwise the default "paid" user (pulse@itamoa.com).
 * No login gates until email validation is complete — every visit is treated as that user.
 */
export async function getServerUser(): Promise<{ id: string; email: string } | null> {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!error && user?.email) return { id: user.id, email: user.email };

  const defaultEmail = (process.env.BYPASS_AUTH_EMAIL?.trim() || "pulse@itamoa.com");
  const { supabaseServer } = await import("@/lib/supabase");
  const db = supabaseServer();
  const { data: row } = await db.from("users").select("id, email").eq("email", defaultEmail).single();
  if (row?.email) return { id: row.id, email: row.email };

  return null;
}
