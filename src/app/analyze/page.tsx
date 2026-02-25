"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("ideaId") ?? "";
  const token = searchParams.get("token") ?? "";
  const [analysisMd, setAnalysisMd] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState("");
  const [paywall, setPaywall] = useState(false);

  useEffect(() => {
    if (!token || !ideaId) return;
    (async () => {
      try {
        const res = await fetch(`/api/idea/${ideaId}/analyze?token=${encodeURIComponent(token)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.analysisMd) setAnalysisMd(data.analysisMd);
        else if (data.paywall) {
          setPaywall(true);
          setError(data.error || "Upgrade for more analyses.");
        } else setError(data.error || "Failed to generate analysis.");
      } catch {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    })();
  }, [ideaId, token]);

  if (!token || !ideaId) return <div className="max-w-2xl mx-auto"><p className="text-zinc-400">Invalid or missing link. Use the link from your email.</p></div>;
  if (loading) return <div className="max-w-2xl mx-auto"><p className="text-zinc-400">Generating analysis…</p></div>;
  if (paywall) return <div className="max-w-2xl mx-auto"><h2 className="text-xl font-bold text-white mb-2">Analysis limit</h2><p className="text-zinc-400 mb-4">{error}</p></div>;
  if (error && !analysisMd) return <div className="max-w-2xl mx-auto"><p className="text-red-400">{error}</p></div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Business analysis</h1>
      <article
        className="prose prose-invert prose-zinc max-w-none"
        dangerouslySetInnerHTML={{
          __html: analysisMd ? analysisMd.split("\n").map((line) => (line.startsWith("## ") ? `<h2>${escapeHtml(line.slice(3))}</h2>` : `<p>${escapeHtml(line)}</p>`)).join("") : "",
        }}
      />
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto text-zinc-400">Loading…</div>}>
      <AnalyzeContent />
    </Suspense>
  );
}
