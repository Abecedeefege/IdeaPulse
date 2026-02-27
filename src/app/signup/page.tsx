"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FirehoseLoader from "@/components/FirehoseLoader";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [bgError, setBgError] = useState("");
  const searchParams = useSearchParams();
  const submittedEmail = useRef("");

  const buildProfile = () => {
    const profile: { primary_goal?: string; constraints?: Record<string, string>; interests?: string[] } = {};
    const goal = searchParams.get("primary_goal");
    const time = searchParams.get("time_per_week");
    const budget = searchParams.get("budget");
    const skills = searchParams.get("skills");
    const risk = searchParams.get("risk_tolerance");
    const interestsParam = searchParams.get("interests");
    if (goal) profile.primary_goal = goal;
    if (time) { profile.constraints = profile.constraints ?? {}; profile.constraints["time_per_week"] = time; }
    if (budget) { profile.constraints = profile.constraints ?? {}; profile.constraints["budget"] = budget; }
    if (skills) { profile.constraints = profile.constraints ?? {}; profile.constraints["skills"] = skills; }
    if (risk) { profile.constraints = profile.constraints ?? {}; profile.constraints["risk_tolerance"] = risk; }
    if (interestsParam) profile.interests = interestsParam.split(",").filter(Boolean);
    return Object.keys(profile).length ? profile : undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submittedEmail.current = email.trim();
    setStatus("done");
    setMessage("We're generating your 10 ideas and sending them to your inbox. This may take a moment.");
    setBgError("");

    try {
      const profile = buildProfile();
      const flow = searchParams.get("flow");
      const summaryProfile = profile && typeof profile === "object"
        ? { primary_goal: profile.primary_goal, constraints: profile.constraints, interests: profile.interests }
        : {};
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: submittedEmail.current,
          email_frequency: "weekly",
          profile: flow === "random" ? {} : summaryProfile,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBgError(data.error || "Something went wrong generating your ideas.");
      }
    } catch {
      setBgError("Network error. Your ideas may still be processing — check your email.");
    }
  };

  if (status === "done") {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-2xl font-bold text-white">Check your email</h1>
        <p className="text-zinc-400">{message}</p>
        <p className="text-sm text-zinc-500">
          We sent a link to <strong className="text-zinc-300">{submittedEmail.current}</strong>. Click it to see your ideas.
        </p>
        <FirehoseLoader show contained label="Generating your ideas…" />
        {bgError && (
          <p className="text-red-400 text-sm mt-4">{bgError}</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Get your 10 ideas</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Enter your email. We&apos;ll generate your ideas and send you a link to view them.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 outline-none transition"
            placeholder="you@example.com"
          />
        </div>
        {message && status === "error" && (
          <p className="text-red-400 text-sm">{message}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 transition-colors"
        >
          Get my ideas
        </button>
        <p className="text-center">
          <Link href="/top-ideas" className="text-sm text-zinc-400 hover:text-violet-400 transition-colors">
            See trending ideas
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto text-zinc-400">Loading…</div>}>
      <SignupForm />
    </Suspense>
  );
}
