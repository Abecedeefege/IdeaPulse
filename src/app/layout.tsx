import type { Metadata } from "next";
import "./globals.css";
import UsageBanner from "@/components/UsageBanner";
import Logo from "@/components/Logo";
import HeaderNav from "@/components/HeaderNav";
import Link from "next/link";
import { getServerUser } from "@/lib/supabase-server";
import { getUserPlan } from "@/lib/user-plan";
import type { PlanType } from "@/lib/user-plan";

export const metadata: Metadata = {
  title: "IdeaPulse",
  description: "5 tailored ideas in your inbox. React, share, or get a full analysis.",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let planType: PlanType = "anonymous";
  try {
    const authUser = await getServerUser();
    if (authUser) {
      const plan = await getUserPlan(authUser.id);
      planType = plan.planType;
    }
  } catch {
    // Fall back to anonymous if auth check fails
  }

  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-zinc-950 text-zinc-100">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-violet-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
          Skip to content
        </a>
        <header className="relative z-40 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Logo />
            </div>
            <div className="hidden sm:flex flex-none justify-center">
              <Link
                href="/ideaHub"
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-600 text-sm font-medium text-white shadow-lg shadow-violet-900/30 hover:bg-violet-500 transition-colors"
              >
                Idea Hub
              </Link>
            </div>
            <HeaderNav planType={planType} />
          </div>
          <div className="sm:hidden border-t border-zinc-800/80 bg-zinc-900/80">
            <div className="max-w-4xl mx-auto px-4 py-2 flex justify-center">
              <Link
                href="/ideaHub"
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-600 text-sm font-medium text-white shadow-md shadow-violet-900/30 hover:bg-violet-500 transition-colors"
              >
                Idea Hub
              </Link>
            </div>
          </div>
        </header>
        <UsageBanner />
        <main id="main-content" className="max-w-4xl mx-auto px-4 py-8 text-zinc-100">{children}</main>
        <footer className="border-t border-zinc-900 bg-zinc-950/80 mt-8">
          <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
            <Logo showWordmark={false} className="opacity-90" />
            <p className="text-center sm:text-right">
              Spark one{" "}
              <span className="text-violet-300">
                lightbulb moment
              </span>{" "}
              at a time.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
