import Link from "next/link";

type LogoProps = {
  showWordmark?: boolean;
  className?: string;
};

export default function Logo({ showWordmark = true, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group${className ? ` ${className}` : ""}`}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-zinc-950 shadow-lg shadow-violet-900/40">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:rotate-3"
        >
          <path
            d="M9 19.25h6M10 21h4M9 10.5a3 3 0 1 1 6 0c0 1.47-.64 2.37-1.3 3.03-.3.3-.57.58-.78.93-.12.21-.22.43-.29.69-.07.24-.11.5-.13.85H11.5c-.02-.35-.06-.61-.13-.85a2.9 2.9 0 0 0-.29-.69c-.21-.35-.48-.63-.78-.93C9.64 12.87 9 11.97 9 10.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 4.25V3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-white group-hover:text-violet-200 transition-colors">
          IdeaPulse
        </span>
      )}
    </Link>
  );
}

