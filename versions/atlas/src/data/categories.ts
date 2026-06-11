import type { AtlasCategory } from "./types";

export const categories: AtlasCategory[] = [
  {
    slug: "saas",
    name: "SaaS",
    blurb:
      "Software that solves one expensive problem for one specific buyer, billed monthly. The compounding machine of indie business.",
    icon: "▤",
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    blurb:
      "Businesses where a model or an agent does the work a junior hire used to do — sold as outcomes, not API calls.",
    icon: "◉",
  },
  {
    slug: "side-project",
    name: "Side Project",
    blurb:
      "Small enough to ship in evenings and weekends, real enough to charge for. The lowest-risk way to learn the whole game.",
    icon: "◐",
  },
  {
    slug: "content-creator",
    name: "Content & Creator",
    blurb:
      "Audiences are distribution. These ideas turn attention into products — newsletters, tools, and media with a business model attached.",
    icon: "✎",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    blurb:
      "Physical and digital goods with modern margins: niche catalogs, operator tools, and retail plays that don't require a warehouse.",
    icon: "◧",
  },
  {
    slug: "local-business",
    name: "Local Business",
    blurb:
      "Boring, cash-flowing, defensible. Services and software for the businesses on your high street that the internet forgot.",
    icon: "⌂",
  },
  {
    slug: "marketing",
    name: "Marketing",
    blurb:
      "Every company on earth needs more customers. These ideas sell picks and shovels to the people doing the digging.",
    icon: "➤",
  },
  {
    slug: "community",
    name: "Community",
    blurb:
      "Memberships, networks, and gathering places people pay to belong to. Retention is the product.",
    icon: "◌",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    blurb:
      "Developers pay for speed and certainty. Tools, infrastructure, and services for the people who build everything else.",
    icon: "⌘",
  },
  {
    slug: "health-wellness",
    name: "Health & Wellness",
    blurb:
      "An evergreen market where trust beats hype. Practical products for sleep, movement, food, and care — without the snake oil.",
    icon: "✚",
  },
];

export function getCategoryBySlug(slug: string): AtlasCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
