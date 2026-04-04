import type { Metadata } from "next";
import "./globals.css";
import UsageBanner from "@/components/UsageBanner";
import Logo from "@/components/Logo";
import NavAuth from "@/components/NavAuth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IdeaPulse",
  description: "10 tailored ideas in your inbox. React, share, or get a full analysis.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
            <nav className="flex-1 min-w-0 flex items-center justify-end gap-4 text-sm">
              <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/top-ideas" className="text-zinc-400 hover:text-white transition-colors">
                Top Ideas
              </a>
              <a href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
                Pricing
              </a>
              <NavAuth />
            </nav>
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
