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
    <section className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Request 10 more ideas</h2>
      <p className="text-sm text-gray-600 mb-3">Get another batch of 10 ideas by email. One batch per day per account.</p>
      {status === "success" ? (
        <p className="text-green-700 text-sm">{message}</p>
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <button type="submit" disabled={status === "loading"} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
            {status === "loading" ? "Sending…" : "Send 10 more"}
          </button>
          {status === "error" && <p className="w-full text-red-600 text-sm mt-1">{message}</p>}
        </form>
      )}
    </section>
  );
}
