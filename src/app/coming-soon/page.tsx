import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming soon | IdeaPulse",
  description: "Pro and Team plans are coming soon.",
};

export default function ComingSoonPage() {
  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-white mb-2">Coming soon</h1>
      <p className="text-zinc-400 mb-6">
        Pro and Team plans are in the works. Stay tuned for like/dislike, personalized suggestions, and team features.
      </p>
      <Link
        href="/pricing"
        className="inline-block py-2 px-4 rounded-xl border border-zinc-600 text-zinc-300 text-sm font-medium hover:border-zinc-500"
      >
        Back to pricing
      </Link>
    </div>
  );
}
