import type { AtlasIdea, CategorySlug } from "../types";
import { saasIdeas } from "./saas";
import { aiAutomationIdeas } from "./ai-automation";
import { sideProjectIdeas } from "./side-project";
import { contentCreatorIdeas } from "./content-creator";
import { ecommerceIdeas } from "./ecommerce";
import { localBusinessIdeas } from "./local-business";
import { marketingIdeas } from "./marketing";
import { communityIdeas } from "./community";
import { developerToolsIdeas } from "./developer-tools";
import { healthWellnessIdeas } from "./health-wellness";

export const allIdeas: AtlasIdea[] = [
  ...saasIdeas,
  ...aiAutomationIdeas,
  ...sideProjectIdeas,
  ...contentCreatorIdeas,
  ...ecommerceIdeas,
  ...localBusinessIdeas,
  ...marketingIdeas,
  ...communityIdeas,
  ...developerToolsIdeas,
  ...healthWellnessIdeas,
];

// Fail the build loudly if any slug is duplicated.
{
  const seen = new Set<string>();
  for (const idea of allIdeas) {
    if (seen.has(idea.slug)) {
      throw new Error(`Duplicate idea slug detected: "${idea.slug}"`);
    }
    seen.add(idea.slug);
  }
}

const bySlug = new Map(allIdeas.map((idea) => [idea.slug, idea]));

export function getIdeaBySlug(slug: string): AtlasIdea | undefined {
  return bySlug.get(slug);
}

export function ideasByCategory(category: CategorySlug): AtlasIdea[] {
  return allIdeas.filter((idea) => idea.category === category);
}

/** 1-based index of an idea within the full atlas, for "№ 042" display. */
export function ideaNumber(slug: string): number {
  return allIdeas.findIndex((idea) => idea.slug === slug) + 1;
}
