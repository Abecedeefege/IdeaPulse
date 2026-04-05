import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | IdeaPulse",
  description: "Choose the plan that fits. Free, Idea Pack, or Subscription.",
  openGraph: { title: "Pricing | IdeaPulse", description: "Choose the plan that fits. Free, Idea Pack, or Subscription." },
};

export default function PricingPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Pricing</h1>
      <p className="text-zinc-400 mb-8">
        Start free, upgrade when you need more.
      </p>
      <div className="grid sm:grid-cols-3 gap-6">
        {/* Free tier */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="font-semibold text-white text-lg mb-1">Free</h2>
          <p className="text-2xl font-bold text-white mb-4">$0</p>
          <ul className="text-sm text-zinc-400 mb-4 space-y-1">
            <li>20 ideas per day</li>
            <li>Like and delete ideas</li>
            <li>Public ideas</li>
          </ul>
          <Link href="/login" className="block w-full text-center py-2 rounded-xl border border-zinc-600 text-zinc-300 text-sm font-medium hover:border-zinc-500 transition-colors">
            Get started
          </Link>
        </div>

        {/* Idea Pack */}
        <div className="rounded-2xl border border-violet-500/50 bg-violet-500/5 p-6">
          <h2 className="font-semibold text-white text-lg mb-1">Idea Pack</h2>
          <p className="text-2xl font-bold text-white mb-4">$1<span className="text-sm font-normal text-zinc-400"> one-time</span></p>
          <ul className="text-sm text-zinc-400 mb-4 space-y-1">
            <li>100 ideas to use anytime</li>
            <li>Private ideas</li>
            <li>Never expires</li>
          </ul>
          <span className="block w-full text-center py-2 rounded-xl bg-zinc-700/50 text-zinc-500 text-sm font-medium cursor-not-allowed">
            Coming soon
          </span>
        </div>

        {/* Subscription */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="font-semibold text-white text-lg mb-1">Subscription</h2>
          <p className="text-2xl font-bold text-white mb-4">$9<span className="text-sm font-normal text-zinc-400">/mo</span></p>
          <ul className="text-sm text-zinc-400 mb-4 space-y-1">
            <li>100 ideas per day</li>
            <li>Private ideas</li>
            <li>Personalized via ideaProfile</li>
          </ul>
          <span className="block w-full text-center py-2 rounded-xl bg-zinc-700/50 text-zinc-500 text-sm font-medium cursor-not-allowed">
            Coming soon
          </span>
        </div>
      </div>
      <p className="mt-8 text-sm text-zinc-500">
        <Link href="/dashboard" className="text-violet-400 hover:text-violet-300">Back to dashboard</Link>
      </p>
    </div>
  );
}
