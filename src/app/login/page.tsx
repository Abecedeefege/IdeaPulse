"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signInWithMagicLink } from "@/lib/auth";
import FirehoseLoader from "@/components/FirehoseLoader";

function LoginForm() {
  const searchParams = useSearchParams();
  const urlMessage = searchParams.get("message");
  const urlRedirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  /** Check if a redirect path is safe (relative, no open-redirect tricks). */
  const isSafeRedirect = (path: string) =>
    path.startsWith("/") && !path.startsWith("//") && !path.includes(":");

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

      // Honor the redirect param from middleware if present and safe,
      // otherwise fall back to the default based on user existence.
      const redirectPath =
        urlRedirect && isSafeRedirect(urlRedirect)
          ? urlRedirect
          : isExisting
            ? "/dashboard"
            : "/profile";

      await signInWithMagicLink(email.trim(), redirectPath);

      setStatus("done");
      setMessage(
        isExisting
          ? "We sent you a login link. Check your email to access your dashboard."
          : "Welcome! We sent you a signup link. Check your email to set up your profile."
      );
    } catch (err) {
      setStatus("error");
      console.error("[login] Magic link error:", err);

      let msg = "Failed to send email. Please try again.";

      if (err instanceof Error) {
        const lower = err.message.toLowerCase();

        if (lower.includes("url") || lower.includes("not set") || lower.includes("not configured")) {
          msg = "Service misconfigured. Please try again later.";
        } else if (lower.includes("rate limit") || lower.includes("once every")) {
          msg = "Too many requests. Please wait a minute and try again.";
        } else if (lower.includes("signups not allowed") || lower.includes("logins are disabled")) {
          msg = "Email login is not enabled. Please contact support.";
        } else if (lower.includes("invalid") && lower.includes("email")) {
          msg = "Please enter a valid email address.";
        }
      }

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
      {urlMessage && (
        <div className="mb-4 rounded-xl border border-violet-500/50 bg-violet-500/10 p-3 text-center text-sm text-zinc-300">
          {urlMessage}
        </div>
      )}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto text-center text-zinc-400">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
