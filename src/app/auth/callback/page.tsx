"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase";
import FirehoseLoader from "@/components/FirehoseLoader";

/** Reject URLs that could cause an open redirect. */
function isSafeRedirect(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes(":");
}

/**
 * Inner component that reads search params and handles auth callback.
 *
 * Supabase uses the implicit flow: tokens arrive as a URL hash fragment
 * (#access_token=…). The browser Supabase client auto-detects the fragment
 * and establishes the session. Once authenticated we redirect to the `next`
 * search-param destination (default: /dashboard).
 */
function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const raw = searchParams.get("next") ?? "/dashboard";
    const next = isSafeRedirect(raw) ? raw : "/dashboard";

    const supabase = supabaseBrowser();

    // The Supabase client reads #access_token from window.location.hash
    // automatically on init and fires SIGNED_IN / TOKEN_REFRESHED.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          subscription.unsubscribe();
          router.replace(next);
        }
      },
    );

    // Fallback: if the hash tokens were already consumed before the listener
    // attached, check the current session.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        subscription.unsubscribe();
        router.replace(next);
      }
    });

    // Timeout: if nothing happens after 10 s, send user to login.
    const timeout = setTimeout(() => {
      subscription.unsubscribe();
      router.replace("/login?error=auth_failed");
    }, 10_000);

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [router, searchParams]);

  return <FirehoseLoader show contained label="Signing you in…" />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<FirehoseLoader show contained label="Signing you in…" />}>
      <AuthCallbackInner />
    </Suspense>
  );
}
