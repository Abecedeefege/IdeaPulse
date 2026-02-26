"use client";

import { useState } from "react";
import { signInWithMagicLink } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      await signInWithMagicLink(email.trim());
      setStatus("done");
      setMessage("Magic link sent. Check your email to log in.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Failed to send magic link.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Log in</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Enter your email and we&apos;ll send you a magic link to access your ideas and profile.
      </p>
      {status === "done" ? (
        <p className="text-emerald-400 text-sm">{message}</p>
      ) : (
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
            {status === "loading" ? "Sending…" : "Send magic link"}
          </button>
        </form>
      )}
    </div>
  );
}

