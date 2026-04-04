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
          Get 10 tailored ideas in your inbox. React, share, or request a full business analysis. We learn from your feedback.
        </p>
        <Link
          href="/onboarding"
          className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg shadow-violet-900/20"
        >
          Get started
        </Link>
      </section>

      <TrendingIdeaRequestsSection />

      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <h2 className="font-semibold text-white mb-2">Free</h2>
          <p className="text-zinc-400 text-sm">Unlimited ideas for now, like/dislike, share. Ideas may appear on the site.</p>
        </div>
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <h2 className="font-semibold text-white mb-2">Paid</h2>
          <p className="text-zinc-400 text-sm">Private ideas, full ownership, on-demand deep analysis.</p>
        </div>
      </section>
    </div>
  );
}
