"use client";

import { useState } from "react";

export default function RequestMoreForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/request-more", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Check your inbox.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  };

  return (
    <section className="mb-8 p-5 border border-zinc-800 rounded-xl bg-zinc-900/40">
      <h2 className="text-lg font-semibold text-white mb-2">Request 10 more ideas</h2>
      <p className="text-sm text-zinc-400 mb-3">Get another batch of 10 ideas by email. One batch per day per account.</p>
      {status === "success" ? (
        <p className="text-emerald-400 text-sm">{message}</p>
      ) : (
        <form onSubmit={submit} className="flex flex-wrap items-end gap-2">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="request-email" className="sr-only">Email</label>
            <input
              id="request-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-zinc-700 rounded-xl px-3 py-2 text-sm bg-zinc-900 text-white placeholder-zinc-500 focus:border-violet-500 outline-none"
            />
          </div>
          <button type="submit" disabled={status === "loading"} className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 transition-colors">
            {status === "loading" ? "Sending…" : "Send 10 more"}
          </button>
          {status === "error" && <p className="w-full text-red-400 text-sm mt-1">{message}</p>}
        </form>
      )}
    </section>
  );
}
