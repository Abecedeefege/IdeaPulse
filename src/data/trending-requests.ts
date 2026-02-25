export type TrendingRequest = {
  slug: string;
  title: string;
  teaser: string;
  image: string;
  promptPreview: string;
};

export const trendingRequests: TrendingRequest[] = [
  {
    slug: "ai-side-hustles-2025",
    title: "AI side hustles that actually make money in 2025",
    teaser: "The one prompt that turned into $12K in 90 days.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    promptPreview: "Ideas for solopreneurs using AI tools, under 10 hrs/week, with real revenue examples...",
  },
  {
    slug: "no-code-saas-ideas",
    title: "No-code SaaS ideas with built-in demand",
    teaser: "Why these 5 niches are begging for a simple tool.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    promptPreview: "Micro-SaaS ideas you can validate in a weekend, with specific buyer pain points...",
  },
  {
    slug: "local-business-automation",
    title: "Local businesses that will pay for automation",
    teaser: "They're still using spreadsheets. Here's what they'll pay for.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    promptPreview: "Service businesses (cleaning, trades, clinics) and the first process to automate...",
  },
  {
    slug: "content-monetization",
    title: "Content → product ideas that creators actually want",
    teaser: "From audience to offer in one clear path.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    promptPreview: "Monetization ideas for creators with 1K–100K followers, low overhead, high intent...",
  },
  {
    slug: "developer-tools-indie",
    title: "Developer tools indie devs will pay for",
    teaser: "The gap between 'I wish this existed' and Stripe.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    promptPreview: "Tools that solve one workflow pain, with clear pricing and a dev audience that pays...",
  },
  {
    slug: "community-first-business",
    title: "Business ideas that start with community",
    teaser: "Build the tribe first. The product second.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    promptPreview: "Ideas where the community is the moat: niche, recurring revenue, low CAC...",
  },
];
