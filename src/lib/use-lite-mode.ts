"use client";

import { useEffect, useState } from "react";

/**
 * "Lite mode" — drop the expensive decorative effects.
 *
 * The costly work on this site is GPU-bound, not network-bound: large blur
 * filters, a requestAnimationFrame particle canvas, a full-viewport gradient
 * that repaints on pointer move, and scroll-linked rotation on big images.
 * Desktop absorbs all of it; a mid-range phone does not.
 *
 * Enabled when ANY of these hold:
 *  - the user asked for reduced motion
 *  - the primary pointer is coarse (touch) — pointer effects are dead weight
 *  - the viewport is phone-sized
 *  - the device reports little memory or few cores
 *
 * Starts `true` and relaxes after mount, so the first paint on a phone is
 * never the heavy one.
 */
export function useLiteMode() {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const evaluate = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const small = window.matchMedia("(max-width: 900px)").matches;

      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
      const fewCores =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;

      setLite(reduced || coarse || small || lowMemory || fewCores);
    };

    evaluate();

    const queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(max-width: 900px)"),
    ];
    queries.forEach((q) => q.addEventListener("change", evaluate));
    return () => queries.forEach((q) => q.removeEventListener("change", evaluate));
  }, []);

  return lite;
}
