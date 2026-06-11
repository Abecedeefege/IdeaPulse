import type { AtlasCollection } from "./types";

export const collections: AtlasCollection[] = [
  {
    slug: "weekend-buildable",
    title: "Weekend-Buildable",
    blurb:
      "Ideas you can take from blank repo to first customer without quitting anything. Small surface area, fast feedback, real money.",
    ideaSlugs: [
      "wedding-speech-studio",
      "estate-sale-router",
      "custom-puzzle-press",
      "deck-checker-pro",
      "cron-sentinel",
      "profession-template-studio",
    ],
  },
  {
    slug: "under-500-to-start",
    title: "Under $500 to Start",
    blurb:
      "No inventory, no lease, no seed round. Every idea here starts with a laptop, a domain, and the willingness to talk to strangers.",
    ideaSlugs: [
      "health-score-sentinel",
      "senior-tech-housecalls",
      "gbp-optimization-desk",
      "visa-checklist-engine",
      "case-study-factory",
      "new-parent-sleep-ops",
      "microgreens-route",
    ],
  },
  {
    slug: "ai-native-plays",
    title: "AI-Native Plays",
    blurb:
      "Businesses that only became possible in the last two years — where a model does the work a junior hire used to do, and you sell the outcome.",
    ideaSlugs: [
      "trades-phone-agent",
      "rfp-response-copilot",
      "podcast-localization-studio",
      "maintenance-triage-ai",
      "menu-engineering-analyst",
      "freight-quote-bot",
    ],
  },
  {
    slug: "boring-but-profitable",
    title: "Boring but Profitable",
    blurb:
      "Nobody will ask about these at a dinner party, and that's exactly the point. Unsexy niches, sticky contracts, quiet cash flow.",
    ideaSlugs: [
      "hoa-board-os",
      "cert-expiry-guardian",
      "hoa-exterior-contracts",
      "gym-equipment-medic",
      "holiday-light-pros",
      "obsolete-parts-foundry",
      "grant-radar",
    ],
  },
  {
    slug: "audience-first",
    title: "Audience-First",
    blurb:
      "Build the audience, then the business model walks in the door. Media, community, and trust plays that compound for years.",
    ideaSlugs: [
      "city-hall-intel",
      "sponsor-rate-index",
      "niche-wiki-network",
      "fractional-cfo-guild",
      "hvac-exam-dojo",
      "practice-owner-circle",
    ],
  },
];

export function getCollectionBySlug(slug: string): AtlasCollection | undefined {
  return collections.find((c) => c.slug === slug);
}
