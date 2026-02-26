import type { Metadata } from "next";
import "./globals.css";
import UsageBanner from "@/components/UsageBanner";
import Logo from "@/components/Logo";

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
        <header className="relative z-40 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Logo />
            <nav className="flex gap-4 text-sm">
              <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</a>
              <a href="/ideas" className="text-zinc-400 hover:text-white transition-colors">Top Ideas</a>
              <a href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</a>
              <a href="/profile" className="text-zinc-400 hover:text-white transition-colors">Profile</a>
            </nav>
          </div>
        </header>
        <UsageBanner />
        <main className="max-w-4xl mx-auto px-4 py-8 text-zinc-100">{children}</main>
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
