import { unlock } from "./achievements";

/**
 * Developer mode paints the layout grid over the page (see globals.css).
 * State lives on <html data-devmode> so it is pure CSS from there on —
 * no React state, no re-render, no cost when it's off.
 */
export function toggleDevMode(force?: boolean) {
  if (typeof document === "undefined") return false;
  const root = document.documentElement;
  const next = force ?? root.dataset.devmode !== "true";
  if (next) {
    root.dataset.devmode = "true";
    unlock("konami");
  } else {
    delete root.dataset.devmode;
  }
  return next;
}
