import type { Metadata } from "next";
import "./globals.css";
import UsageBanner from "@/components/UsageBanner";

export const metadata: Metadata = {
  title: "IdeaPulse",
  description: "10 tailored ideas in your inbox. React, share, or get a full analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-zinc-950 text-zinc-100">
        <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg text-white hover:text-violet-300 transition-colors">IdeaPulse</a>
            <nav className="flex gap-4">
              <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</a>
              <a href="/ideas" className="text-zinc-400 hover:text-white transition-colors">Top Ideas</a>
            </nav>
          </div>
        </header>
        <UsageBanner />
        <main className="max-w-4xl mx-auto px-4 py-8 text-zinc-100">{children}</main>
      </body>
    </html>
  );
}
