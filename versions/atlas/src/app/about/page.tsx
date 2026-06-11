import type { Metadata } from "next";
import Link from "next/link";
import { allIdeas } from "@/data/ideas";

export const metadata: Metadata = {
  title: "About",
  description:
    "IdeaPulse Atlas is the editorial edition of IdeaPulse: a hand-curated library of business ideas with pre-written, honest mini-analyses.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
        About this edition
      </p>
      <h1 className="font-display mt-3 text-4xl text-zinc-50 sm:text-5xl">
        A field guide, not a firehose.
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed text-zinc-300">
        <p>
          <strong className="text-zinc-100">IdeaPulse</strong> generates
          business ideas on demand — a pulse of fresh possibilities, tuned to
          you. <em className="font-display text-violet-300">Atlas</em> is its
          editorial sibling: instead of generating, it curates. Every one of the{" "}
          {allIdeas.length} entries here was chosen, written, and analyzed by
          hand, the way a magazine assembles an issue.
        </p>
        <p>
          Each idea carries the same anatomy IdeaPulse uses for its deep
          analysis — pre-computed and ready to read: the{" "}
          <strong className="text-zinc-100">market</strong> as it actually is,{" "}
          <strong className="text-zinc-100">monetization</strong> with real
          price points, <strong className="text-zinc-100">first steps</strong>{" "}
          you could start this week, the{" "}
          <strong className="text-zinc-100">risks</strong> nobody puts in the
          pitch deck, and an honest note on{" "}
          <strong className="text-zinc-100">who each idea is for</strong>.
        </p>
        <p>
          The bar for inclusion was simple: no idea made the atlas if the
          analysis could have been written without thinking. You will find no
          &ldquo;start a dropshipping store&rdquo; here — but you will find a
          service that monitors restaurant health-inspection scores, a Q&amp;A
          market for heavy-equipment mechanics, and a 3D-printing catalog of
          discontinued appliance parts.
        </p>
        <p>
          Ideas are starting points. The work — the conversations with real
          customers, the first ugly version, the invoice that actually gets
          paid — is yours. The atlas just makes sure you start from honest
          ground.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/ideas/"
          className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Open the atlas
        </Link>
        <Link
          href="/collections/"
          className="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-violet-500/50 hover:text-violet-200"
        >
          Start with a collection
        </Link>
      </div>
    </div>
  );
}
