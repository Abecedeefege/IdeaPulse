import { supabaseServer } from "@/lib/supabase";

/**
 * Ensures a row exists in `users` for this email (service role).
 * Used so bypass-auth and first-time visitors always have an app user record.
 */
export async function ensureAppUserExists(email: string): Promise<{ id: string; email: string } | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  const db = supabaseServer();
  const { data: existing, error: selErr } = await db.from("users").select("id, email").eq("email", normalized).maybeSingle();
  if (selErr) {
    console.error("ensureAppUserExists: select", selErr);
  }
  if (existing?.id && existing.email) {
    return { id: existing.id, email: existing.email };
  }

  const { data: inserted, error: insErr } = await db
    .from("users")
    .insert({ email: normalized, email_frequency: "weekly", profile_json: {} })
    .select("id, email")
    .single();

  if (insErr || !inserted) {
    if (insErr && typeof insErr === "object" && "code" in insErr && String((insErr as { code?: string }).code) === "23505") {
      const { data: again } = await db.from("users").select("id, email").eq("email", normalized).single();
      if (again?.id) return { id: again.id, email: again.email };
    }
    console.error("ensureAppUserExists: insert", insErr);
    return null;
  }

  return { id: inserted.id, email: inserted.email };
}
