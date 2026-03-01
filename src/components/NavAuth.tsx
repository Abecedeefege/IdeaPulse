"use client";

// All visits act as pulse@itamoa.com until email validation is complete — no login prompt.
export default function NavAuth() {
  return (
    <a href="/profile" className="text-zinc-400 hover:text-white transition-colors">
      Profile
    </a>
  );
}
