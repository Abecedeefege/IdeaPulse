"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FirehoseLoader from "@/components/FirehoseLoader";
import { supabaseBrowser } from "@/lib/supabase";

export default function LoadingPage() {
  const router = useRouter();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const supabase = supabaseBrowser();

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (session?.user) {
        setDone(true);
        router.replace("/ideas");
        return;
      }
    };

    check();
    const t = setInterval(check, 800);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [router]);

  return <FirehoseLoader show={!done} label="Generating ideas…" />;
}
