"use client";

import { useState, Suspense } from "react";
import IdeaGenerationLoader from "@/components/IdeaGenerationLoader";
import { useIdeaGenerationRun } from "@/hooks/use-idea-generation-run";

const GOALS = ["Side project / passive income", "Full-time startup", "Content / audience", "Local business", "AI / automation", "Other"];
const INTERESTS = ["Marketing / growth", "AI / automation", "Content", "Local business", "SaaS", "E-commerce", "Community"];
const TIME_OPTIONS = ["1–3h", "5–10h", "10–20h"];
const BUDGET_OPTIONS = ["$0–100", "$100–500", "$500–2k", "$2k+"];
const SKILL_TAGS = ["Engineering", "Design", "Marketing", "Sales", "Ops"];
const RISK_OPTIONS = ["Low", "Medium", "High"];

/** Prompt for the "Get random ideas" action (diverse industries). */
const RANDOM_IDEAS_CONTEXT =
  "Generate 5 diverse, practical business ideas across different industries and models: SaaS, local services, e-commerce, content, AI tools, and community. Each idea should target a different audience and feel distinct and actionable.";

function IconDice({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 8h.01M16 8h.01M8 16h.01M16 16h.01M12 12h.01" />
    </svg>
  );
}

function IconGear({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function IdeaHubContent() {
  const [textPrompt, setTextPrompt] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [goalOther, setGoalOther] = useState("");
  const [timePerWeek, setTimePerWeek] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const { run, loading, messages, sessionKey } = useIdeaGenerationRun();

  const toggleInterest = (x: string) => {
    setInterests((prev) => (prev.includes(x) ? prev.filter((i) => i !== x) : [...prev, x]));
  };

  const [anonUsed, setAnonUsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("anon_batch_used") === "true";
    }
    return false;
  });
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  /** Returns true if user is logged in, false if anonymous */
  const checkAuth = async (): Promise<boolean> => {
    const meRes = await fetch("/api/me", { credentials: "include" });
    if (!meRes.ok) return false;
    const data = await meRes.json().catch(() => null);
    return !!data?.email;
  };

  const generateAnon = async (context: string): Promise<{ batchId: string } | { error: string }> => {
    if (anonUsed) {
      setShowSignupPrompt(true);
      return { error: "Create a free account to get 20 ideas per day." };
    }
    const res = await fetch("/api/generate-anon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: data.error || "Something went wrong." };
    localStorage.setItem("anon_batch_used", "true");
    setAnonUsed(true);
    setShowSignupPrompt(true);
    return { batchId: "anon" };
  };

  const handleTextPromptContinue = () => {
    const trimmed = textPrompt.trim();
    if (!trimmed) return;
    void run(
      async () => {
        const isAuth = await checkAuth();
        if (!isAuth) return generateAnon(trimmed);
        const res = await fetch("/api/similar-ideas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ context: trimmed }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return { error: data.error || "Something went wrong." };
        return { batchId: data.batchId };
      },
      "text",
      trimmed,
    );
  };

  const handleRandomIdeas = () => {
    void run(
      async () => {
        const isAuth = await checkAuth();
        if (!isAuth) return generateAnon(RANDOM_IDEAS_CONTEXT);
        const res = await fetch("/api/similar-ideas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ context: RANDOM_IDEAS_CONTEXT }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return { error: data.error || "Something went wrong." };
        return { batchId: data.batchId };
      },
      "random",
    );
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const goalValue = primaryGoal === "Other" ? goalOther : primaryGoal;
    void run(
      async () => {
        const isAuth = await checkAuth();
        if (!isAuth) {
          const context = [goalValue, timePerWeek, budget, skills, riskTolerance, interests.join(", ")].filter(Boolean).join(". ");
          return generateAnon(context || "general audience");
        }
        const profile = {
          primary_goal: goalValue,
          constraints: { time_per_week: timePerWeek, budget, skills, risk_tolerance: riskTolerance },
          interests,
        };
        const res = await fetch("/api/generate-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ profile }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return { error: data.error || "Something went wrong." };
        return { batchId: data.batchId };
      },
      "custom",
      { primaryGoal: goalValue },
    );
  };

  return (
    <Suspense fallback={<div className="max-w-lg mx-auto py-12 text-zinc-400">Loading…</div>}>
      <IdeaGenerationLoader show={loading} messages={messages} sessionKey={sessionKey} />

      {showSignupPrompt && (
        <div className="max-w-2xl mx-auto mb-6 rounded-xl border border-violet-500/50 bg-violet-500/10 p-4 text-center">
          <p className="text-sm text-zinc-300 mb-2">
            Create a free account to get <strong>20 ideas per day</strong> and save them to your dashboard.
          </p>
          <a
            href="/login"
            className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Sign up free
          </a>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white">What do you want to create next</h1>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h2 className="text-sm font-semibold text-zinc-300 mb-2">Describe your ideas</h2>
            <label className="block text-xs text-zinc-500 mb-1">Tell us what kind of idea you wanted</label>
            <textarea
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              placeholder="e.g. SaaS for small teams, no-code tools…"
              rows={3}
              className="w-full border border-zinc-700 rounded-lg px-3 py-2 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm resize-y"
            />
            <button
              type="button"
              onClick={handleTextPromptContinue}
              disabled={!textPrompt.trim() || loading}
              className="mt-3 w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium disabled:opacity-50 transition-colors"
            >
              Continue
            </button>
          </div>

          <button
            type="button"
            onClick={handleRandomIdeas}
            disabled={loading}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:border-violet-500/50 hover:text-violet-300 transition-colors min-h-[140px] disabled:opacity-50"
          >
            <IconDice className="w-10 h-10 text-white" />
            <span className="text-sm font-medium">Get random ideas</span>
          </button>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h2 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
              <IconGear className="w-4 h-4 text-zinc-500" />
              Custom ideas
            </h2>
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Primary goal</label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white focus:border-violet-500 outline-none transition text-sm"
                >
                  <option value="">Select</option>
                  {GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {primaryGoal === "Other" && (
                  <input
                    type="text"
                    value={goalOther}
                    onChange={(e) => setGoalOther(e.target.value)}
                    className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 mt-2 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm"
                    placeholder="Describe"
                  />
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Time per week</label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {TIME_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setTimePerWeek(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition ${
                          timePerWeek === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={timePerWeek}
                    onChange={(e) => setTimePerWeek(e.target.value)}
                    className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm"
                    placeholder="Custom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Budget</label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition ${
                          budget === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm"
                    placeholder="Custom"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Skills</label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {SKILL_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSkills(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        skills === tag ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm"
                  placeholder="Custom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Risk tolerance</label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {RISK_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setRiskTolerance(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        riskTolerance === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(e.target.value)}
                  className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm"
                  placeholder="Custom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleInterest(i)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition ${
                        interests.includes(i) ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 transition-colors"
              >
                Get my ideas
              </button>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
