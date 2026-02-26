"use client";

import { useState } from "react";

export default function DebugEmailPage() {
  const [report, setReport] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [testTo, setTestTo] = useState("");
  const [testResult, setTestResult] = useState<Record<string, unknown> | null>(null);
  const [secret, setSecret] = useState("");

  const runCheck = async () => {
    setLoading(true);
    setReport(null);
    try {
      const url = secret ? `/api/debug/email-check?key=${encodeURIComponent(secret)}` : "/api/debug/email-check";
      const res = await fetch(url);
      const data = await res.json().catch(() => ({}));
      setReport({ status: res.status, ...data });
    } catch (e) {
      setReport({ error: String(e) });
    } finally {
      setLoading(false);
    }
  };

  const sendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTo.trim()) return;
    setTestResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/debug/send-test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({ to: testTo.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      setTestResult({ status: res.status, ...data });
    } catch (e) {
      setTestResult({ error: String(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Email debug</h1>
      <p className="text-sm text-zinc-400">
        Use this page to verify email config. In production, set DEBUG_EMAIL_CHECK_SECRET and pass it below.
      </p>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Secret (optional, for production)</label>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border border-zinc-700 rounded-xl px-3 py-2 bg-zinc-900 text-white text-sm"
          placeholder="DEBUG_EMAIL_CHECK_SECRET"
        />
      </div>

      <div>
        <button
          type="button"
          onClick={runCheck}
          disabled={loading}
          className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Loading…" : "Run email-check"}
        </button>
        {report && (
          <pre className="mt-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 overflow-auto max-h-60">
            {JSON.stringify(report, null, 2)}
          </pre>
        )}
      </div>

      <form onSubmit={sendTest} className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">Send test email (Resend + magic link) to:</label>
        <div className="flex gap-2">
          <input
            type="email"
            value={testTo}
            onChange={(e) => setTestTo(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 border border-zinc-700 rounded-xl px-3 py-2 bg-zinc-900 text-white text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
          >
            Send test
          </button>
        </div>
        {testResult && (
          <pre className="mt-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 overflow-auto max-h-40">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        )}
      </form>

      <p className="text-xs text-zinc-500">
        <a href="/profile" className="text-violet-400 hover:text-violet-300">Back to profile</a>
      </p>
    </div>
  );
}
