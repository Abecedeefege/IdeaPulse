import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { trendingRequests } from "@/data/trending-requests";
import IdeaQuickActions from "@/components/IdeaQuickActions";
import GetSimilarIdeas from "@/components/GetSimilarIdeas";

export default async function TrendingRequestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const req = trendingRequests.find((r) => r.slug === slug);
  if (!req) notFound();
  const base = process.env.NEXT_PUBLIC_APP_URL || "";
  const ideaUrl = base ? `${base}/trending/${slug}` : undefined;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="aspect-video relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800 mb-8">
        <Image src={req.image} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-xs font-medium text-violet-300 uppercase tracking-wider">Trending request</span>
          <h1 className="text-2xl font-bold text-white mt-1">{req.title}</h1>
        </div>
      </div>
      <p className="text-lg text-violet-200 mb-6">{req.teaser}</p>
      <p className="text-zinc-400 mb-8">{req.promptPreview}</p>
      <IdeaQuickActions
        title={req.title}
        oneSentenceHook={req.teaser}
        shareText={req.promptPreview}
        ideaUrl={ideaUrl}
      />
      <GetSimilarIdeas context={`${req.title}. ${req.promptPreview}`} />
    </div>
  );
}
