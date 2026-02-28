"use client";

import { useState } from "react";
import { signInWithMagicLink } from "@/lib/auth";
import FirehoseLoader from "@/components/FirehoseLoader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const checkRes = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const checkData = await checkRes.json().catch(() => ({ exists: false }));
      const isExisting = checkData.exists;

      const redirectPath = isExisting ? "/dashboard" : "/profile";
      await signInWithMagicLink(email.trim(), redirectPath);

      setStatus("done");
      setMessage(
        isExisting
          ? "We sent you a login link. Check your email to access your dashboard."
          : "Welcome! We sent you a signup link. Check your email to set up your profile."
      );
    } catch (err) {
      setStatus("error");
      const msg = err instanceof Error && err.message.toLowerCase().includes("url") ? "Service misconfigured. Please try again later." : "Failed to send email. Please try again.";
      setMessage(msg);
    }
  };

  if (status === "done") {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-2xl font-bold text-white">Check your email</h1>
        <p className="text-zinc-400">{message}</p>
        <p className="text-sm text-zinc-500">Click the link we sent to continue. You can close this tab after.</p>
        <FirehoseLoader show contained label="Waiting for you to click the link…" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Log in / Sign up</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Enter your email. We&apos;ll send you a magic link — no password needed.
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
          {status === "loading" ? "Sending…" : "Continue with email"}
        </button>
      </form>
    </div>
  );
}
