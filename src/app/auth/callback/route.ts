import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * GET /auth/callback
 *
 * Handles the Supabase PKCE code exchange after a user clicks a magic-link
 * email. Exchanges the one-time `code` for a session (set via cookies) and
 * redirects to the `next` query parameter (default: /dashboard).
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  const safeNext = isSafeRedirect(next) ? next : "/dashboard";

  if (!code) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("error", "missing_code");
    return NextResponse.redirect(loginUrl);
  }

  // Build the redirect response first so the Supabase client can attach
  // Set-Cookie headers to it during the code exchange.
  const res = NextResponse.redirect(new URL(safeNext, req.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("error", "auth_code_invalid");
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

/** Reject URLs that could cause an open redirect. */
function isSafeRedirect(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes(":");
}
