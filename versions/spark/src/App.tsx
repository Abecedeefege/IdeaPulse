import { useCallback, useEffect, useRef, useState } from "react";
import { decodeIdeaId } from "./engine/generator";
import type { FullIdea, Profile } from "./engine/types";
import {
  currentStreak,
  loadState,
  pushSeen,
  saveState,
  touchStreak,
} from "./lib/storage";
import type { SparkState } from "./lib/storage";
import { clearShareHash, getSharedIdeaId, shareIdea } from "./lib/share";
import Deck from "./components/Deck";
import FilterSheet from "./components/FilterSheet";
import Header from "./components/Header";
import Onboarding from "./components/Onboarding";
import SavedView from "./components/SavedView";
import StatsView from "./components/StatsView";
import TabBar from "./components/TabBar";
import type { Tab } from "./components/TabBar";
import Toast from "./components/Toast";

type View = "onboarding" | Tab;

export default function App() {
  const [state, setState] = useState<SparkState>(loadState);
  const [view, setView] = useState<View>(state.onboarded ? "deck" : "onboarding");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  // Shared idea from a #i=<id> link — becomes the first card in the deck.
  // (Initializer stays pure; the hash is cleared in an effect below.)
  const [leadIdea] = useState<FullIdea | null>(() => {
    const id = getSharedIdeaId();
    return id ? decodeIdeaId(id) : null;
  });

  useEffect(() => {
    if (leadIdea) clearShareHash();
  }, [leadIdea]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  }, []);

  const handleSwipe = useCallback((idea: FullIdea, liked: boolean) => {
    setState((s) => {
      const touched = touchStreak(s.stats);
      const stats = {
        ...touched,
        seen: touched.seen + 1,
        liked: touched.liked + (liked ? 1 : 0),
        skipped: touched.skipped + (liked ? 0 : 1),
      };
      const saved =
        liked && !s.saved.some((e) => e.id === idea.id)
          ? [...s.saved, { id: idea.id, idea, savedAt: Date.now() }]
          : s.saved;
      return { ...s, stats, saved, seenIds: pushSeen(s.seenIds, idea.id) };
    });
  }, []);

  const handleShare = useCallback(
    async (idea: FullIdea) => {
      const result = await shareIdea(idea);
      if (result === "copied") showToast("Link copied");
      else if (result === "shared") showToast("Shared!");
    },
    [showToast]
  );

  const handleRemoveSaved = useCallback(
    (id: string) => {
      setState((s) => ({ ...s, saved: s.saved.filter((e) => e.id !== id) }));
      showToast("Removed from saved");
    },
    [showToast]
  );

  const handleOnboarded = useCallback((profile: Profile) => {
    setState((s) => ({ ...s, profile, onboarded: true }));
    setView("deck");
  }, []);

  const handleApplyFilters = useCallback(
    (profile: Profile) => {
      setState((s) => ({ ...s, profile }));
      setFiltersOpen(false);
      showToast("Deck reshuffled");
    },
    [showToast]
  );

  if (view === "onboarding") {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Onboarding onDone={handleOnboarded} />
        <Toast message={toast} />
      </div>
    );
  }

  const streak = currentStreak(state.stats);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header streak={streak} />

      <main className="flex flex-1 flex-col pb-28">
        {view === "deck" && (
          <Deck
            profile={state.profile}
            seenIds={state.seenIds}
            leadIdea={leadIdea}
            onSwipe={handleSwipe}
            onShare={handleShare}
            onOpenFilters={() => setFiltersOpen(true)}
            keysEnabled={!filtersOpen}
          />
        )}
        {view === "saved" && (
          <SavedView
            saved={state.saved}
            onRemove={handleRemoveSaved}
            onShare={handleShare}
            onGoDeck={() => setView("deck")}
          />
        )}
        {view === "stats" && <StatsView stats={{ ...state.stats, streak }} saved={state.saved} />}
      </main>

      <TabBar tab={view} onChange={setView} />

      {filtersOpen && (
        <FilterSheet
          profile={state.profile}
          onApply={handleApplyFilters}
          onClose={() => setFiltersOpen(false)}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
