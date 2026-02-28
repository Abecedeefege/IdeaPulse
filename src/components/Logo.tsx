import Image from "next/image";
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
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700/50 shadow-lg shadow-violet-900/20 overflow-hidden">
        <Image
          src="/lightbulb.png"
          alt=""
          width={28}
          height={39}
          className="h-7 w-auto object-contain transition-transform duration-200 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-white group-hover:text-violet-200 transition-colors">
          IdeaPulse
        </span>
      )}
    </Link>
  );
}
