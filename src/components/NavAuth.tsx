"use client";

import { useAuth } from "@/lib/useAuth";

export default function NavAuth() {
  const loggedIn = useAuth();

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
