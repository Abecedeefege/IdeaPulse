import Link from "next/link";
import Image from "next/image";
import { trendingRequests } from "@/data/trending-requests";

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
          href="/signup"
          className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg shadow-violet-900/20"
        >
          Get started
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Trending idea requests</h2>
        <p className="text-zinc-400 mb-8">Super detailed prompts that get great ideas. Click to see why they work.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingRequests.map((req) => (
            <Link
              key={req.slug}
              href={`/trending/${req.slug}`}
              className="group block rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-zinc-900 transition-all duration-200"
            >
              <div className="aspect-[16/10] relative bg-zinc-800 overflow-hidden">
                <Image
                  src={req.image}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-medium text-violet-300 uppercase tracking-wider">Trending</span>
                  <h3 className="text-lg font-semibold text-white mt-1 line-clamp-2 group-hover:text-violet-200 transition-colors">
                    {req.title}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-violet-200/90 font-medium mb-1">{req.teaser}</p>
                <p className="text-xs text-zinc-500 line-clamp-2">{req.promptPreview}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <h2 className="font-semibold text-white mb-2">Free</h2>
          <p className="text-zinc-400 text-sm">10 ideas per day, like/dislike, share. Ideas may appear on the site.</p>
        </div>
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <h2 className="font-semibold text-white mb-2">Paid</h2>
          <p className="text-zinc-400 text-sm">Private ideas, full ownership, on-demand deep analysis.</p>
        </div>
      </section>
    </div>
  );
}
