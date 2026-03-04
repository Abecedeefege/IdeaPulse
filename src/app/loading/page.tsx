"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FirehoseLoader from "@/components/FirehoseLoader";
import { supabaseBrowser } from "@/lib/supabase";

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const supabase = supabaseBrowser();
    const redirect = searchParams.get("redirect");
    const safeRedirect = redirect?.startsWith("/") && !redirect.startsWith("//") ? redirect : "/ideas";

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (session?.user) {
        setDone(true);
        router.replace(safeRedirect);
        return;
      }
    };

    check();
    const t = setInterval(check, 800);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [router, searchParams]);

  return <FirehoseLoader show={!done} contained label="Signing you in…" />;
}

export default function LoadingPage() {
  return (
    <Suspense fallback={<FirehoseLoader show contained label="Signing you in…" />}>
      <LoadingContent />
    </Suspense>
  );
}
