import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Pricing</h1>
      <p className="text-zinc-400 mb-8">
        Choose the plan that fits. Like/dislike and personalized suggestions are part of Pro.
      </p>
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="font-semibold text-white text-lg mb-1">Free</h2>
          <p className="text-2xl font-bold text-white mb-4">$0</p>
          <p className="text-sm text-zinc-400 mb-4">10 ideas per day, share, view top ideas.</p>
          <Link href="/signup" className="block w-full text-center py-2 rounded-xl border border-zinc-600 text-zinc-300 text-sm font-medium hover:border-zinc-500">
            Get started
          </Link>
        </div>
        <div className="rounded-2xl border border-violet-500/50 bg-violet-500/5 p-6">
          <h2 className="font-semibold text-white text-lg mb-1">Pro</h2>
          <p className="text-2xl font-bold text-white mb-4">$9<span className="text-sm font-normal text-zinc-400">/mo</span></p>
          <p className="text-sm text-zinc-400 mb-4">Like/dislike, personalized suggestions, private ideas, deep analysis.</p>
          <Link href="/signup" className="block w-full text-center py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500">
            Subscribe
          </Link>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="font-semibold text-white text-lg mb-1">Team</h2>
          <p className="text-2xl font-bold text-white mb-4">$29<span className="text-sm font-normal text-zinc-400">/mo</span></p>
          <p className="text-sm text-zinc-400 mb-4">Everything in Pro, shared workspace, team preferences.</p>
          <Link href="/signup" className="block w-full text-center py-2 rounded-xl border border-zinc-600 text-zinc-300 text-sm font-medium hover:border-zinc-500">
            Contact us
          </Link>
        </div>
      </div>
      <p className="mt-8 text-sm text-zinc-500">
        <Link href="/dashboard" className="text-violet-400 hover:text-violet-300">Back to dashboard</Link>
      </p>
    </div>
  );
}
