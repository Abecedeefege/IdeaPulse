"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase";

const GOALS = ["Side project / passive income", "Full-time startup", "Content / audience", "Local business", "AI / automation", "Other"];
const INTERESTS = ["Marketing / growth", "AI / automation", "Content", "Local business", "SaaS", "E-commerce", "Community"];
const TIME_OPTIONS = ["1–3h", "5–10h", "10–20h"];
const BUDGET_OPTIONS = ["$0–100", "$100–500", "$500–2k", "$2k+"];
const SKILL_TAGS = ["Engineering", "Design", "Marketing", "Sales", "Ops"];
const RISK_OPTIONS = ["Low", "Medium", "High"];

const BRIEF_MAX = 200;

export default function ProfilePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brief, setBrief] = useState("");
  const [emailFrequency, setEmailFrequency] = useState<"daily" | "weekly">("weekly");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [goalOther, setGoalOther] = useState("");
  const [timePerWeek, setTimePerWeek] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.email) return;
        setIsLoggedIn(true);
        setEmailFrequency(data.email_frequency === "daily" ? "daily" : "weekly");
        const p = data.profile || {};
        setBrief(p.preference_summary || "");
        const goalsList = GOALS.slice(0, -1);
        if (goalsList.includes(p.primary_goal)) {
          setPrimaryGoal(p.primary_goal || "");
          setGoalOther("");
        } else if (p.primary_goal) {
          setPrimaryGoal("Other");
          setGoalOther(p.primary_goal);
        }
        const constraints = p.constraints || {};
        setTimePerWeek(constraints.time_per_week || "");
        setBudget(constraints.budget || "");
        setSkills(constraints.skills || "");
        setRiskTolerance(constraints.risk_tolerance || "");
        setInterests(Array.isArray(p.interests) ? p.interests : []);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await supabaseBrowser().auth.signOut();
    router.push("/");
    router.refresh();
  };

  const toggleInterest = (x: string) => {
    setInterests((prev) => (prev.includes(x) ? prev.filter((i) => i !== x) : [...prev, x]));
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_frequency: emailFrequency,
          profile: {
            primary_goal: primaryGoal === "Other" ? goalOther : primaryGoal,
            constraints: {
              time_per_week: timePerWeek,
              budget,
              skills,
              risk_tolerance: riskTolerance,
            },
            interests,
            preference_summary: brief,
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Failed to save profile.");
        return;
      }
      setStatus("success");
      setMessage("Profile saved.");
    } catch {
      setStatus("error");
      setMessage("Network error while saving profile.");
    }
  };

  if (loading) {
    return <div className="max-w-lg mx-auto text-zinc-400">Loading profile…</div>;
  }

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Your profile</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Log out
        </button>
      </div>

      <form onSubmit={saveProfile} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            What kind of ideas are you looking for?
          </label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value.slice(0, BRIEF_MAX))}
            maxLength={BRIEF_MAX}
            rows={3}
            className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 outline-none transition resize-none"
            placeholder="E.g. AI-powered tools for small restaurants, low budget, can build myself…"
          />
          <p className="text-xs text-zinc-500 mt-1 text-right">
            {brief.length}/{BRIEF_MAX}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">How often do you want ideas?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
              <input
                type="radio"
                name="frequency"
                checked={emailFrequency === "daily"}
                onChange={() => setEmailFrequency("daily")}
                className="accent-violet-500"
              />{" "}
              Daily
            </label>
            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
              <input
                type="radio"
                name="frequency"
                checked={emailFrequency === "weekly"}
                onChange={() => setEmailFrequency("weekly")}
                className="accent-violet-500"
              />{" "}
              Weekly
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Primary goal</label>
          <select
            value={primaryGoal}
            onChange={(e) => setPrimaryGoal(e.target.value)}
            className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white focus:border-violet-500 outline-none transition"
          >
            <option value="">Select</option>
            {GOALS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {primaryGoal === "Other" && (
            <input
              type="text"
              value={goalOther}
              onChange={(e) => setGoalOther(e.target.value)}
              className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 mt-2 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
              placeholder="Describe"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Time per week</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {TIME_OPTIONS.map((opt) => (
                <button key={opt} type="button" onClick={() => setTimePerWeek(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${timePerWeek === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}
                >{opt}</button>
              ))}
            </div>
            <input type="text" value={timePerWeek} onChange={(e) => setTimePerWeek(e.target.value)}
              className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
              placeholder="Custom (e.g. 5–10h)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Budget</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {BUDGET_OPTIONS.map((opt) => (
                <button key={opt} type="button" onClick={() => setBudget(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${budget === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}
                >{opt}</button>
              ))}
            </div>
            <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
              placeholder="Custom (e.g. bootstrapped)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {SKILL_TAGS.map((tag) => (
              <button key={tag} type="button" onClick={() => setSkills(tag)}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${skills === tag ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}
              >{tag}</button>
            ))}
          </div>
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
            className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
            placeholder="Custom (e.g. dev, design, marketing)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Risk tolerance</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {RISK_OPTIONS.map((opt) => (
              <button key={opt} type="button" onClick={() => setRiskTolerance(opt)}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${riskTolerance === opt ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}
              >{opt}</button>
            ))}
          </div>
          <input type="text" value={riskTolerance} onChange={(e) => setRiskTolerance(e.target.value)}
            className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
            placeholder="Custom (e.g. low / medium / high)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button key={i} type="button" onClick={() => toggleInterest(i)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${interests.includes(i) ? "bg-violet-600 border-violet-500 text-white" : "border-zinc-600 text-zinc-400 hover:border-zinc-500"}`}
              >{i}</button>
            ))}
          </div>
        </div>

        {message && (
          <p className={status === "error" ? "text-red-400 text-sm" : "text-emerald-400 text-sm"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 transition-colors"
        >
          {status === "saving" ? "Saving…" : "Save profile"}
        </button>
      </form>
    </div>
  );
}
