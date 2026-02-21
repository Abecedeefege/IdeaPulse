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
    <html lang="en">
      <body className="antialiased min-h-screen">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg text-gray-900">IdeaPulse</a>
            <nav className="flex gap-4">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="/ideas" className="text-gray-600 hover:text-gray-900">Top Ideas</a>
              <a href="/prompts" className="text-gray-600 hover:text-gray-900">Prompts</a>
            </nav>
          </div>
        </header>
        <UsageBanner />
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
