import { IDEAS_PROMPT_TEMPLATE, ANALYSIS_PROMPT_TEMPLATE } from "@/lib/prompts";

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Prompts sent to OpenAI</h1>
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Ideas generation</h2>
        <p className="text-sm text-gray-500 mb-2">Placeholders: <code className="bg-gray-100 px-1 rounded">{`{{count}}`}</code>, <code className="bg-gray-100 px-1 rounded">{`{{userProfileSummary}}`}</code>.</p>
        <pre className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-sm whitespace-pre-wrap overflow-x-auto">{IDEAS_PROMPT_TEMPLATE}</pre>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Business analysis</h2>
        <p className="text-sm text-gray-500 mb-2">Placeholders: <code className="bg-gray-100 px-1 rounded">{`{{ideaJson}}`}</code>, <code className="bg-gray-100 px-1 rounded">{`{{userContext}}`}</code>.</p>
        <pre className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-sm whitespace-pre-wrap overflow-x-auto">{ANALYSIS_PROMPT_TEMPLATE}</pre>
      </section>
    </div>
  );
}
