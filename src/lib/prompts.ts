/**
 * Prompt sent to OpenAI to generate ideas.
 * Shown in the app at /prompts for transparency.
 */
export const IDEAS_PROMPT_TEMPLATE = `Generate exactly {{count}} business/startup ideas. Each idea: title, one_sentence_hook, why_it_could_work, difficulty_1_to_5 (1-5), first_step_under_30min, validate_question, share_text_tweet_sized (~280 chars). Tailor to: {{userProfileSummary}}.`;

export function buildIdeasPrompt(userProfileSummary: string, count: number = 10): string {
  return IDEAS_PROMPT_TEMPLATE
    .replace("{{count}}", String(count))
    .replace("{{userProfileSummary}}", userProfileSummary || "general audience");
}

export const ANALYSIS_PROMPT_TEMPLATE = `Analyze this idea for a business plan. Idea: {{ideaJson}}. User context: {{userContext}}. Be concise.`;

export function buildAnalysisPrompt(ideaJson: string, userContext: string): string {
  return ANALYSIS_PROMPT_TEMPLATE
    .replace("{{ideaJson}}", ideaJson)
    .replace("{{userContext}}", userContext);
}
