export type TopPrompt = {
  id: string;
  prompt: string;
  description: string;
};

export const topPrompts: TopPrompt[] = [
  {
    id: "fully-ai-doable",
    prompt: "Give me 5 business ideas an AI could build and run entirely on its own",
    description: "Fully autonomous AI businesses",
  },
  {
    id: "google-sheets-empire",
    prompt: "Business ideas that start as a single Google Sheet",
    description: "Spreadsheet-first startups",
  },
  {
    id: "automate-boring-life",
    prompt: "Ways to use AI to automate the most annoying parts of daily life",
    description: "AI for everyday automation",
  },
  {
    id: "weekend-saas",
    prompt: "Micro-SaaS ideas I can build and launch in one weekend",
    description: "Ship-fast weekend projects",
  },
  {
    id: "no-code-passive",
    prompt: "Passive income ideas using only no-code tools and AI",
    description: "Zero-code passive income",
  },
];
