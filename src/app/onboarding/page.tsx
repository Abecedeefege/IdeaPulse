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

function IconTextPrompt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconSparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function OnboardingContent() {
  const router = useRouter();
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

  const handleGetMyIdeas = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const goal = primaryGoal === "Other" ? goalOther : primaryGoal;
    if (goal) params.set("primary_goal", goal);
    if (timePerWeek) params.set("time_per_week", timePerWeek);
    if (budget) params.set("budget", budget);
    if (skills) params.set("skills", skills);
    if (riskTolerance) params.set("risk_tolerance", riskTolerance);
    if (interests.length) params.set("interests", interests.join(","));
    router.push(`/signup?${params.toString()}`);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">What do you want to create next</h1>
      <p className="text-zinc-400 text-sm flex items-center gap-3 flex-wrap">
        <span>Optional:</span>
        <span className="inline-flex items-center gap-1.5 text-zinc-500" title="Text prompt">
          <IconTextPrompt className="w-4 h-4" />
          <span>Text prompt</span>
        </span>
        <span className="text-zinc-600">|</span>
        <Link
          href="/signup?flow=random"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors"
          title="Get random ideas"
        >
          <IconSparkles className="w-4 h-4" />
          <span>Get random ideas</span>
        </Link>
      </p>

      <form onSubmit={handleGetMyIdeas} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Primary goal</label>
          <select value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white focus:border-violet-500 outline-none transition">
            <option value="">Select</option>
            {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {primaryGoal === "Other" && <input type="text" value={goalOther} onChange={(e) => setGoalOther(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 mt-2 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition" placeholder="Describe" />}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Time per week</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTimePerWeek(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    timePerWeek === opt
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
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
              className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
              placeholder="Custom (e.g. 5–10h)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Budget</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBudget(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    budget === opt
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
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
              className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
              placeholder="Custom (e.g. bootstrapped)"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {SKILL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSkills(tag)}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${
                  skills === tag
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
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
            className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
            placeholder="Custom (e.g. dev, design, marketing)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Risk tolerance</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {RISK_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setRiskTolerance(opt)}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${
                  riskTolerance === opt
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "border-zinc-600 text-zinc-400 hover:border-zinc-500"
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
            className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
            placeholder="Custom (e.g. low / medium / high)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button key={i} type="button" onClick={() => toggleInterest(i)} className={`px-3 py-1.5 rounded-full text-sm border transition ${interests.includes(i) ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}>{i}</button>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium transition-colors">Get my ideas</button>
      </form>
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

