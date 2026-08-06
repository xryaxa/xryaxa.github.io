/**
 * Tiny achievement bus.
 *
 * Components call `unlock()` from anywhere; the Toaster listens on `window`.
 * A CustomEvent instead of React context keeps this out of the render tree
 * entirely — nothing re-renders just because an easter egg fired.
 */

export type Achievement = {
  id: string;
  title: string;
  hint: string;
};

export const ACHIEVEMENTS = {
  boot: { id: "boot", title: "Cold Boot", hint: "You watched the whole intro." },
  konami: {
    id: "konami",
    title: "Developer Mode",
    hint: "↑↑↓↓←→←→BA — the grid is showing.",
  },
  palette: {
    id: "palette",
    title: "Power User",
    hint: "You found the command palette.",
  },
  resume: {
    id: "resume",
    title: "Persistent",
    hint: "The button dodged. You clicked anyway.",
  },
  bottom: {
    id: "bottom",
    title: "Completionist",
    hint: "You read all the way to the end.",
  },
  terminal: {
    id: "terminal",
    title: "Shell Access",
    hint: "Terminal mode unlocked. Try `help`.",
  },
} satisfies Record<string, Achievement>;

export type AchievementId = keyof typeof ACHIEVEMENTS;

const EVENT = "ryaxa:achievement";
const STORE_KEY = "ryaxa:achievements";

function readStore(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function unlocked(): string[] {
  return readStore();
}

/** Fire an achievement. Repeat unlocks are silently ignored. */
export function unlock(id: AchievementId) {
  if (typeof window === "undefined") return;
  const have = readStore();
  if (have.includes(id)) return;

  const next = [...have, id];
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch {
    /* storage disabled — the toast still shows, it just won't persist */
  }

  window.dispatchEvent(
    new CustomEvent<Achievement>(EVENT, { detail: ACHIEVEMENTS[id] }),
  );
}

export function onAchievement(fn: (a: Achievement) => void) {
  const handler = (e: Event) => fn((e as CustomEvent<Achievement>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
