"use client";

import { useState } from "react";
import Link from "next/link";

type PlanType = "anonymous" | "free" | "pack" | "subscriber";

type Props = {
  planType: PlanType;
};

export default function HeaderNav({ planType }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = planType !== "anonymous";
  const showPricing = planType !== "subscriber";

  // Links that always show directly (not in burger menu)
  // Anonymous: Idea Hub, Top Ideas, Pricing (as "Login / Sign up")
  // Free: Idea Hub (direct), rest in burger
  // Pack: Idea Hub (direct), Dashboard (direct), rest in burger
  // Subscriber: Idea Hub (direct), Dashboard (direct), rest in burger

  const showDashboardDirect = planType === "pack" || planType === "subscriber";

  // Burger menu items (for logged-in users)
  const burgerItems: { href: string; label: string }[] = [];
  if (isLoggedIn) {
    if (!showDashboardDirect) {
      burgerItems.push({ href: "/dashboard", label: "Dashboard" });
    }
    burgerItems.push({ href: "/top-ideas", label: "Top Ideas" });
    burgerItems.push({ href: "/profile", label: "Profile" });
    if (showPricing) {
      burgerItems.push({ href: "/pricing", label: "Pricing" });
    }
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="flex-1 min-w-0 flex items-center justify-end gap-4 text-sm">
        {/* Anonymous: show Top Ideas and Login/Signup */}
        {!isLoggedIn && (
          <>
            <Link href="/top-ideas" className="text-zinc-400 hover:text-white transition-colors">
              Top Ideas
            </Link>
            <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">
              Login / Sign up
            </Link>
          </>
        )}

        {/* Logged in: show Dashboard direct for pack/subscriber */}
        {isLoggedIn && showDashboardDirect && (
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
            Dashboard
          </Link>
        )}

        {/* Logged in: burger menu */}
        {isLoggedIn && burgerItems.length > 0 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-50 min-w-[160px] rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl py-1">
                  {burgerItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
