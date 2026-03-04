import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns the account type for a user. Used for quota and feature gating.
 * Reads account_type column if present (after migration), else profile_json.plan.
 */
export type AccountType = "free" | "pro" | "team";

export async function getAccountType(db: SupabaseClient, userId: string): Promise<AccountType> {
  const { data } = await db
    .from("users")
    .select("profile_json")
    .eq("id", userId)
    .single();

  if (!data) return "free";

  const profile = (data as { profile_json?: { plan?: string } }).profile_json;
  if (profile?.plan === "pro" || profile?.plan === "team") return profile.plan;

  return "free";
}
