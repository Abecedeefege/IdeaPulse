import Link from "next/link";

const nav = [
  { href: "/ideas/", label: "Ideas" },
  { href: "/categories/saas/", label: "Categories" },
  { href: "/collections/", label: "Collections" },
  { href: "/about/", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0a0a0b]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <svg
            viewBox="0 0 64 64"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="21" fill="none" stroke="#7c3aed" strokeWidth="3.5" />
            <polyline
              points="12,34 22,34 27,22 32,42 37,28 41,34 52,34"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-lg text-zinc-100">
            IdeaPulse{" "}
            <span className="italic text-violet-300 transition-colors group-hover:text-violet-200">
              Atlas
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-400 sm:gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
