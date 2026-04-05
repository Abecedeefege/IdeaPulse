import { supabaseServer } from "@/lib/supabase";
import { sendMagicLinkEmail } from "@/lib/email";

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;

/**
 * Generates a magic link via Supabase Admin API (bypasses email rate limits)
 * and delivers it via Resend.
 */
export async function sendMagicLinkServer(
  email: string,
  redirectPath: string = "/ideas",
): Promise<{ ok: boolean; error?: string }> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!appUrl || LOCALHOST_PATTERN.test(appUrl)) {
    console.error("auth-server: NEXT_PUBLIC_APP_URL is missing or localhost");
    return { ok: false, error: "APP_URL_NOT_SET" };
  }

  const redirectTo = `${appUrl}/auth/callback?next=${encodeURIComponent(redirectPath)}`;

  try {
    const db = supabaseServer();
    const { data, error } = await db.auth.admin.generateLink({
      type: "magiclink",
      email: email.trim(),
      options: { redirectTo },
    });

    if (error || !data?.properties?.action_link) {
      console.error("auth-server: generateLink failed", error?.message);
      return { ok: false, error: error?.message ?? "Failed to generate link" };
    }

    await sendMagicLinkEmail(email.trim(), data.properties.action_link);
    return { ok: true };
  } catch (e) {
    console.error("auth-server: unexpected error", e);
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}
