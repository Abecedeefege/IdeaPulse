import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">IdeaPulse</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get 10 tailored ideas in your inbox. React, share, or request a full business analysis. We learn from your feedback.
        </p>
        <div className="mt-8">
          <Link href="/onboarding" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">
            Get started
          </Link>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="font-semibold text-gray-900 mb-2">Free</h2>
          <p className="text-gray-600 text-sm">10 ideas per day, like/dislike, share. Ideas may appear on the site.</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="font-semibold text-gray-900 mb-2">Paid</h2>
          <p className="text-gray-600 text-sm">Private ideas, full ownership, on-demand deep analysis.</p>
        </div>
      </section>
    </div>
  );
}
