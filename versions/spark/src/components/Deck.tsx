import { useCallback, useEffect, useRef, useState } from "react";
import { nextIdeas } from "../engine/generator";
import type { FullIdea, Profile } from "../engine/types";
import ActionBar from "./ActionBar";
import IdeaCard from "./IdeaCard";

const EXIT_MS = 280;
const REFILL_BATCH = 10;
const MIN_QUEUE = 4;

export default function Deck({
  profile,
  seenIds,
  leadIdea,
  onSwipe,
  onShare,
  onOpenFilters,
  keysEnabled,
}: {
  profile: Profile;
  seenIds: string[];
  leadIdea: FullIdea | null;
  onSwipe: (idea: FullIdea, liked: boolean) => void;
  onShare: (idea: FullIdea) => void;
  onOpenFilters: () => void;
  keysEnabled: boolean;
}) {
  const profileKey = `${[...profile.interests].sort().join(",")}|${profile.budgetTier}|${profile.effortTier}`;

  const [queue, setQueue] = useState<FullIdea[]>(() => {
    const lead = leadIdea ? [leadIdea] : [];
    const exclude = new Set([...seenIds, ...lead.map((l) => l.id)]);
    return [...lead, ...nextIdeas(REFILL_BATCH, profile, exclude)];
  });

  const seenRef = useRef(seenIds);
  seenRef.current = seenIds;
  const profileRef = useRef(profile);
  profileRef.current = profile;

  // Reseed the deck when the profile changes (skip the initial render).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setQueue(nextIdeas(REFILL_BATCH, profileRef.current, seenRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileKey]);

  // Keep the queue topped up.
  useEffect(() => {
    if (queue.length >= MIN_QUEUE) return;
    const exclude = new Set([...seenRef.current, ...queue.map((i) => i.id)]);
    const fresh = nextIdeas(REFILL_BATCH, profileRef.current, exclude);
    if (fresh.length > 0) setQueue((q) => [...q, ...fresh.filter((f) => !q.some((x) => x.id === f.id))]);
  }, [queue]);

  // ── Swipe mechanics (imperative DOM for 60fps drags) ─────────────────────────
  const topElRef = useRef<HTMLDivElement | null>(null);
  const likeRef = useRef<HTMLDivElement | null>(null);
  const skipRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, dx: 0, dy: 0 });
  const animatingRef = useRef(false);

  const setStamps = (dx: number) => {
    const k = Math.min(Math.abs(dx) / 90, 1);
    if (likeRef.current) likeRef.current.style.opacity = dx > 0 ? String(k) : "0";
    if (skipRef.current) skipRef.current.style.opacity = dx < 0 ? String(k) : "0";
  };

  const queueRef = useRef(queue);
  queueRef.current = queue;

  const flingOut = useCallback(
    (dir: 1 | -1, dy = 0) => {
      const idea = queueRef.current[0];
      if (!idea || animatingRef.current) return;
      animatingRef.current = true;
      dragRef.current.active = false;
      const el = topElRef.current;
      if (el) {
        el.style.transition = `transform ${EXIT_MS}ms ease-in, opacity ${EXIT_MS}ms ease-in`;
        el.style.transform = `translate(${dir * 120}vw, ${dy * 0.4}px) rotate(${dir * 28}deg)`;
        el.style.opacity = "0.9";
        setStamps(dir * 999);
      }
      window.setTimeout(() => {
        animatingRef.current = false;
        setQueue((q) => q.slice(1));
        onSwipe(idea, dir === 1);
      }, EXIT_MS);
    },
    [onSwipe]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animatingRef.current) return;
    const el = topElRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, dx: 0, dy: 0 };
    el.setPointerCapture(e.pointerId);
    el.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || animatingRef.current) return;
    d.dx = e.clientX - d.startX;
    d.dy = e.clientY - d.startY;
    const el = topElRef.current;
    if (!el) return;
    el.style.transform = `translate(${d.dx}px, ${d.dy * 0.4}px) rotate(${d.dx * 0.06}deg)`;
    setStamps(d.dx);
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    if (!d.active || animatingRef.current) return;
    d.active = false;
    const threshold = Math.min(120, window.innerWidth * 0.35);
    if (Math.abs(d.dx) > threshold) {
      flingOut(d.dx > 0 ? 1 : -1, d.dy);
    } else {
      const el = topElRef.current;
      if (el) {
        el.style.transition = "transform 320ms cubic-bezier(0.22, 1.35, 0.36, 1)";
        el.style.transform = "";
      }
      setStamps(0);
    }
  };

  // Keyboard support: ← skip, → save.
  useEffect(() => {
    if (!keysEnabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        flingOut(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        flingOut(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flingOut, keysEnabled]);

  const visible = queue.slice(0, 3);
  const top = queue[0] ?? null;

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium text-zinc-500">
          Fresh deck daily · tuned to {profile.interests.length || "all"}{" "}
          {profile.interests.length === 1 ? "interest" : "interests"}
        </p>
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur transition hover:border-violet-400/40 hover:text-violet-200 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          Filters
        </button>
      </div>

      <div className="relative h-[clamp(380px,56vh,540px)]">
        {/* Gradient glows behind the deck */}
        <div className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 animate-glow-drift rounded-full bg-violet-600/25 blur-3xl" />
        <div
          className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 animate-glow-drift rounded-full bg-fuchsia-500/20 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />

        {visible.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/10 text-center">
            <span className="text-3xl" aria-hidden="true">✨</span>
            <p className="px-10 text-sm text-zinc-400">
              Shuffling fresh ideas… loosen your filters if the deck stays empty.
            </p>
          </div>
        )}

        {visible
          .map((idea, i) => {
            const isTop = i === 0;
            return (
              <div
                key={idea.id}
                ref={isTop ? topElRef : undefined}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
                className={`absolute inset-0 transition-transform duration-300 ease-out will-change-transform ${
                  isTop ? "touch-none-strict cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
                style={{
                  zIndex: 30 - i * 10,
                  transform: isTop ? undefined : `translateY(${i * 14}px) scale(${1 - i * 0.045})`,
                }}
              >
                <IdeaCard idea={idea} />
                {isTop && (
                  <>
                    <div
                      ref={likeRef}
                      className="pointer-events-none absolute left-5 top-6 -rotate-12 rounded-xl border-4 border-emerald-400 px-3 py-1 text-2xl font-black tracking-widest text-emerald-400 opacity-0"
                    >
                      LIKE
                    </div>
                    <div
                      ref={skipRef}
                      className="pointer-events-none absolute right-5 top-6 rotate-12 rounded-xl border-4 border-rose-400 px-3 py-1 text-2xl font-black tracking-widest text-rose-400 opacity-0"
                    >
                      SKIP
                    </div>
                  </>
                )}
              </div>
            );
          })
          .reverse()}
      </div>

      <div className="py-5">
        <ActionBar
          disabled={!top}
          onSkip={() => flingOut(-1)}
          onSave={() => flingOut(1)}
          onShare={() => top && onShare(top)}
        />
        <p className="mt-3 hidden text-center text-[11px] text-zinc-600 sm:block">
          Drag the card, tap the buttons, or use ← / → keys
        </p>
      </div>
    </div>
  );
}
