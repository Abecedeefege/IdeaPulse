"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function FeedbackForm() {
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("ideaId") ?? "";
  const token = searchParams.get("token") ?? "";
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async () => {
    if (!token) return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/idea/${ideaId}/feedback?token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, content }),
      });
      if (res.ok) {
        setStatus("done");
        setContent("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Send feedback</h1>
      {status === "done" ? (
        <p className="text-gray-600">Thanks! Your feedback was saved.</p>
      ) : (
        <>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24" placeholder="Your feedback or follow-up question..." />
          <button onClick={submit} disabled={status === "loading"} className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg disabled:opacity-50">{status === "loading" ? "Sending…" : "Send"}</button>
          {status === "error" && <p className="mt-2 text-red-600 text-sm">Something went wrong.</p>}
        </>
      )}
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="max-w-lg mx-auto">Loading…</div>}>
      <FeedbackForm />
    </Suspense>
  );
}
