"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase";

export default function NavAuth() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session?.user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loggedIn === null) return null;

  if (loggedIn) {
    return (
      <a href="/profile" className="text-zinc-400 hover:text-white transition-colors">
        Profile
      </a>
    );
  }

  return (
    <a href="/login" className="text-zinc-400 hover:text-white transition-colors">
      Log in / Sign up
    </a>
  );
}
