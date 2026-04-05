import Link from "next/link";
import { TrendingIdeaRequestsSection } from "@/components/TrendingIdeaRequestsSection";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          IdeaPulse
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Get 5 tailored ideas in your inbox. React, share, or request a full business analysis. We learn from your feedback.
        </p>
        <Link
          href="/ideaHub"
          className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg shadow-violet-900/20"
        >
          Try it free
        </Link>
      </section>

      <TrendingIdeaRequestsSection />

      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <h2 className="font-semibold text-white mb-2">Free</h2>
          <p className="text-zinc-400 text-sm">20 ideas per day. Like, delete, and share. Ideas may appear on the site.</p>
        </div>
        <div className="p-6 rounded-2xl border border-violet-500/30 bg-violet-500/5">
          <h2 className="font-semibold text-white mb-2">Idea Pack — $1</h2>
          <p className="text-zinc-400 text-sm">100 ideas to use anytime. Private ideas, full ownership.</p>
        </div>
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <h2 className="font-semibold text-white mb-2">Subscription — $9/mo</h2>
          <p className="text-zinc-400 text-sm">100 ideas per day. Private ideas, personalized via your ideaProfile.</p>
        </div>
      </section>
    </div>
  );
}
