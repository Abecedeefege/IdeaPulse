import Link from "next/link";
import Image from "next/image";
import { trendingRequests } from "@/data/trending-requests";

type Props = {
  heading?: string;
  description?: string;
};

export function TrendingIdeaRequestsSection({
  heading = "Trending idea requests",
  description = "Super detailed prompts that get great ideas. Click to see why they work.",
}: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-2">{heading}</h2>
      <p className="text-zinc-400 mb-8">{description}</p>
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
                alt={req.title}
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
  );
}
