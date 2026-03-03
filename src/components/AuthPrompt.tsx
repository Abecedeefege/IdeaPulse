"use client";

import { useState } from "react";
import { signInWithMagicLink } from "@/lib/auth";

type AuthPromptProps = {
  onClose: () => void;
  message?: string;
  redirectPath?: string;
};

export default function AuthPrompt({
  onClose,
  message = "Log in or sign up to continue",
  redirectPath,
}: AuthPromptProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const path = redirectPath || (typeof window !== "undefined" ? window.location.pathname : "/dashboard");
      await signInWithMagicLink(email.trim(), path);
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMsg("Failed to send email. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <div className="border border-violet-500/30 rounded-xl bg-violet-500/5 p-5 text-center space-y-2">
        <p className="text-sm font-medium text-white">Check your email</p>
        <p className="text-xs text-zinc-400">We sent a magic link to <strong className="text-zinc-300">{email}</strong>. Click it to continue.</p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-700 rounded-xl bg-zinc-900/80 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white">{message}</p>
        <button type="button" onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-xs" aria-label="Close">
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 min-w-0 border border-zinc-700 rounded-lg px-3 py-2 text-sm bg-zinc-800 text-white placeholder-zinc-500 focus:border-violet-500 outline-none transition"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors shrink-0"
        >
          {status === "loading" ? "…" : "Continue"}
        </button>
      </form>
      {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
    </div>
  );
}
