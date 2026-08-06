"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BOOT_LINES } from "@/lib/content";

const SEEN_KEY = "ryaxa:booted";

/**
 * Cold-open terminal boot before the site appears.
 *
 * Rules it has to obey to stay a delight rather than an obstacle:
 *  - shows once per tab (sessionStorage), not on every navigation
 *  - Enter, Escape, click or any key skips it immediately
 *  - never runs under prefers-reduced-motion
 *  - the real page is already in the DOM behind it, so crawlers and
 *    screen readers never see the overlay as the page content
 */
export function BootSequence() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(0);
  const [ready, setReady] = useState(false);
  const timers = useRef<number[]>([]);

  const dismiss = useCallback(() => {
    setActive(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode — the boot simply replays, which is harmless */
    }
  }, []);

  // Decide whether to run at all. Runs after mount so the static HTML is
  // identical for every visitor and hydration never mismatches.
  useEffect(() => {
    if (reduced) return;
    // Home page only. On the 404 the boot screen would cover the joke that
    // page exists for, and on any deep link it just delays the content.
    if (pathname !== "/") return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    // Deliberate: the prerendered HTML must be identical for every visitor, so
    // whether the intro plays can only be decided after mount. Reading
    // sessionStorage during render would desync hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!seen) setActive(true);
  }, [reduced, pathname]);

  // Reveal the lines one at a time.
  useEffect(() => {
    if (!active) return;
    let t = 220;
    BOOT_LINES.forEach((line, i) => {
      t += line.delay;
      timers.current.push(
        window.setTimeout(() => setShown(i + 1), t),
      );
    });
    timers.current.push(window.setTimeout(() => setReady(true), t + 380));
    const copy = timers.current;
    return () => copy.forEach(clearTimeout);
  }, [active]);

  // Lock scroll while the overlay owns the screen.
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  // Any key exits. Enter is advertised, but nobody should feel trapped.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") return;
      e.preventDefault();
      dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, dismiss]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismiss}
          role="presentation"
          aria-hidden
        >
          <div className="w-full max-w-xl font-mono text-[13px] leading-7 sm:text-sm">
            <div className="mb-5 flex items-center gap-2 text-dim">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[11px] tracking-widest uppercase">
                ryaxa — boot
              </span>
            </div>

            {BOOT_LINES.slice(0, shown).map((line) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22 }}
                className="text-muted"
              >
                <span className="text-accent">$</span> {line.text}
              </motion.div>
            ))}

            {ready && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex items-center gap-2 text-fg"
              >
                <span>Press</span>
                <kbd className="rounded border border-line bg-surface px-2 py-0.5 text-[11px] text-fg">
                  Enter
                </kbd>
                <span>to continue</span>
                <span className="animate-caret ml-0.5 inline-block h-4 w-[7px] bg-accent align-middle" />
              </motion.div>
            )}

            {!ready && (
              <div className="mt-6 h-6 text-dim">
                <span className="animate-caret inline-block h-4 w-[7px] bg-accent align-middle" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
