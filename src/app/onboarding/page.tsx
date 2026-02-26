"use client";

import { useState } from "react";

const GOALS = ["Side project / passive income", "Full-time startup", "Content / audience", "Local business", "AI / automation", "Other"];
const INTERESTS = ["Marketing / growth", "AI / automation", "Content", "Local business", "SaaS", "E-commerce", "Community"];
const TIME_OPTIONS = ["1–3h", "5–10h", "10–20h"];
const BUDGET_OPTIONS = ["$0–100", "$100–500", "$500–2k", "$2k+"];
const SKILL_TAGS = ["Engineering", "Design", "Marketing", "Sales", "Ops"];
const RISK_OPTIONS = ["Low", "Medium", "High"];

export default function OnboardingPage() {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("weekly");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [goalOther, setGoalOther] = useState("");
  const [timePerWeek, setTimePerWeek] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const toggleInterest = (x: string) => {
    setInterests((prev) => (prev.includes(x) ? prev.filter((i) => i !== x) : [...prev, x]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          email_frequency: frequency,
          profile: {
            primary_goal: primaryGoal === "Other" ? goalOther : primaryGoal,
            constraints: { time_per_week: timePerWeek, budget, skills, risk_tolerance: riskTolerance },
            interests,
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("Check your inbox for a confirmation link and your first batch of ideas.");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold text-white mb-4">You&apos;re in</h2>
        <p className="text-zinc-400 mb-6">{message}</p>
        <a href="/dashboard" className="text-violet-400 font-medium hover:text-violet-300">Go to dashboard</a>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Onboarding</h1>
        <a
          href="/ideas"
          className="text-sm font-medium text-violet-300 hover:text-violet-200 underline-offset-4 hover:underline"
        >
          Get random ideas →
        </a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 outline-none transition" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">How often?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer"><input type="radio" name="frequency" checked={frequency === "daily"} onChange={() => setFrequency("daily")} className="accent-violet-500" /> Daily</label>
            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer"><input type="radio" name="frequency" checked={frequency === "weekly"} onChange={() => setFrequency("weekly")} className="accent-violet-500" /> Weekly</label>
          </div>
        </div>
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
        {message && <p className={status === "error" ? "text-red-400 text-sm" : "text-zinc-400 text-sm"}>{message}</p>}
        <button type="submit" disabled={status === "loading"} className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 transition-colors">{status === "loading" ? "Signing up…" : "Get my ideas"}</button>
      </form>
    </div>
  );
}
