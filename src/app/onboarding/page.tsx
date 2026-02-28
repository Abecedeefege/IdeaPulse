"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GOALS = ["Side project / passive income", "Full-time startup", "Content / audience", "Local business", "AI / automation", "Other"];
const INTERESTS = ["Marketing / growth", "AI / automation", "Content", "Local business", "SaaS", "E-commerce", "Community"];
const TIME_OPTIONS = ["1–3h", "5–10h", "10–20h"];
const BUDGET_OPTIONS = ["$0–100", "$100–500", "$500–2k", "$2k+"];
const SKILL_TAGS = ["Engineering", "Design", "Marketing", "Sales", "Ops"];
const RISK_OPTIONS = ["Low", "Medium", "High"];

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

function OnboardingContent() {
  const router = useRouter();
  const [textPrompt, setTextPrompt] = useState("");
  const [textPromptLoading, setTextPromptLoading] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [goalOther, setGoalOther] = useState("");
  const [timePerWeek, setTimePerWeek] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (x: string) => {
    setInterests((prev) => (prev.includes(x) ? prev.filter((i) => i !== x) : [...prev, x]));
  };

  const handleTextPromptContinue = async () => {
    const trimmed = textPrompt.trim();
    if (!trimmed) return;
    setTextPromptLoading(true);
    try {
      const meRes = await fetch("/api/me", { credentials: "include" });
      if (meRes.status === 401) {
        router.push(`/signup?context=${encodeURIComponent(trimmed)}`);
        return;
      }
      const similarRes = await fetch("/api/similar-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ context: trimmed }),
      });
      if (!similarRes.ok) {
        const data = await similarRes.json().catch(() => ({}));
        if (similarRes.status === 403) {
          router.push(`/signup?context=${encodeURIComponent(trimmed)}`);
          return;
        }
        alert(data.error || "Something went wrong.");
        return;
      }
      router.push("/ideas");
    } catch {
      alert("Network error. Try again.");
    } finally {
      setTextPromptLoading(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomLoading(true);
    try {
      const meRes = await fetch("/api/me", { credentials: "include" });
      if (meRes.status === 401) {
        const params = new URLSearchParams();
        const goal = primaryGoal === "Other" ? goalOther : primaryGoal;
        if (goal) params.set("primary_goal", goal);
        if (timePerWeek) params.set("time_per_week", timePerWeek);
        if (budget) params.set("budget", budget);
        if (skills) params.set("skills", skills);
        if (riskTolerance) params.set("risk_tolerance", riskTolerance);
        if (interests.length) params.set("interests", interests.join(","));
        router.push(`/signup?${params.toString()}`);
        return;
      }
      const profile = {
        primary_goal: primaryGoal === "Other" ? goalOther : primaryGoal,
        constraints: { time_per_week: timePerWeek, budget, skills, risk_tolerance: riskTolerance },
        interests,
      };
      const batchRes = await fetch("/api/generate-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profile }),
      });
      const data = await batchRes.json().catch(() => ({}));
      if (!batchRes.ok) {
        if (batchRes.status === 403 || batchRes.status === 429) {
          const params = new URLSearchParams();
          if (profile.primary_goal) params.set("primary_goal", profile.primary_goal);
          if (timePerWeek) params.set("time_per_week", timePerWeek);
          if (budget) params.set("budget", budget);
          if (skills) params.set("skills", skills);
          if (riskTolerance) params.set("risk_tolerance", riskTolerance);
          if (interests.length) params.set("interests", interests.join(","));
          router.push(`/signup?${params.toString()}`);
          return;
        }
        alert(data.error || "Something went wrong.");
        return;
      }
      router.push("/ideas");
    } catch {
      alert("Network error. Try again.");
    } finally {
      setCustomLoading(false);
    }
  };

  return (
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
            disabled={!textPrompt.trim() || textPromptLoading}
            className="mt-3 w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium disabled:opacity-50 transition-colors"
          >
            {textPromptLoading ? "…" : "Continue"}
          </button>
        </div>

        <Link
          href="/signup?flow=random"
          className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:border-violet-500/50 hover:text-violet-300 transition-colors min-h-[140px]"
        >
          <IconDice className="w-10 h-10 text-white" />
          <span className="text-sm font-medium">Get random ideas</span>
        </Link>
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
              <select value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white focus:border-violet-500 outline-none transition text-sm">
                <option value="">Select</option>
                {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {primaryGoal === "Other" && <input type="text" value={goalOther} onChange={(e) => setGoalOther(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 mt-2 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm" placeholder="Describe" />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Time per week</label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {TIME_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => setTimePerWeek(opt)} className={`px-3 py-1.5 rounded-full text-xs border transition ${timePerWeek === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}>{opt}</button>
                  ))}
                </div>
                <input type="text" value={timePerWeek} onChange={(e) => setTimePerWeek(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm" placeholder="Custom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Budget</label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => setBudget(opt)} className={`px-3 py-1.5 rounded-full text-xs border transition ${budget === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}>{opt}</button>
                  ))}
                </div>
                <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm" placeholder="Custom" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Skills</label>
              <div className="flex flex-wrap gap-2 mb-1">
                {SKILL_TAGS.map((tag) => (
                  <button key={tag} type="button" onClick={() => setSkills(tag)} className={`px-3 py-1.5 rounded-full text-xs border transition ${skills === tag ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}>{tag}</button>
                ))}
              </div>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm" placeholder="Custom" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Risk tolerance</label>
              <div className="flex flex-wrap gap-2 mb-1">
                {RISK_OPTIONS.map((opt) => (
                  <button key={opt} type="button" onClick={() => setRiskTolerance(opt)} className={`px-3 py-1.5 rounded-full text-xs border transition ${riskTolerance === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}>{opt}</button>
                ))}
              </div>
              <input type="text" value={riskTolerance} onChange={(e) => setRiskTolerance(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition text-sm" placeholder="Custom" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button key={i} type="button" onClick={() => toggleInterest(i)} className={`px-3 py-1.5 rounded-full text-sm border transition ${interests.includes(i) ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}>{i}</button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={customLoading} className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 transition-colors">Get my ideas</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="max-w-lg mx-auto py-12 text-zinc-400">Loading…</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
