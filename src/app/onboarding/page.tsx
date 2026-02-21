"use client";

import { useState } from "react";

const GOALS = ["Side project / passive income", "Full-time startup", "Content / audience", "Local business", "AI / automation", "Other"];
const INTERESTS = ["Marketing / growth", "AI / automation", "Content", "Local business", "SaaS", "E-commerce", "Community"];

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
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">You&apos;re in</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <a href="/dashboard" className="text-gray-900 font-medium underline">Go to dashboard</a>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Onboarding</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How often?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="radio" name="frequency" checked={frequency === "daily"} onChange={() => setFrequency("daily")} /> Daily</label>
            <label className="flex items-center gap-2"><input type="radio" name="frequency" checked={frequency === "weekly"} onChange={() => setFrequency("weekly")} /> Weekly</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary goal</label>
          <select value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option value="">Select</option>
            {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {primaryGoal === "Other" && <input type="text" value={goalOther} onChange={(e) => setGoalOther(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2" placeholder="Describe" />}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time per week</label>
            <input type="text" value={timePerWeek} onChange={(e) => setTimePerWeek(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g. 5–10h" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g. bootstrapped" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g. dev, design, marketing" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Risk tolerance</label>
          <input type="text" value={riskTolerance} onChange={(e) => setRiskTolerance(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g. low / medium / high" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button key={i} type="button" onClick={() => toggleInterest(i)} className={`px-3 py-1 rounded-full text-sm border ${interests.includes(i) ? "bg-gray-900 text-white border-gray-900" : "border-gray-300"}`}>{i}</button>
            ))}
          </div>
        </div>
        {message && <p className={status === "error" ? "text-red-600 text-sm" : "text-gray-600 text-sm"}>{message}</p>}
        <button type="submit" disabled={status === "loading"} className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50">{status === "loading" ? "Signing up…" : "Get my ideas"}</button>
      </form>
    </div>
  );
}
