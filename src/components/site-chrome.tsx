"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { CommandPalette } from "./command-palette";
import { Terminal } from "./terminal";
import { Toaster } from "./ui/toaster";
import { toggleDevMode } from "@/lib/dev-mode";
import { unlock } from "@/lib/achievements";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Everything that floats above the page: scroll progress, ⌘K palette,
 * terminal, achievement toasts, and the keyboard easter eggs.
 * One client boundary instead of five keeps the hydration cost in one place.
 */
export function SiteChrome() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Konami code → developer mode.
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[pos]) {
        pos += 1;
        if (pos === KONAMI.length) {
          pos = 0;
          toggleDevMode(true);
        }
      } else {
        // Restart the sequence, allowing the wrong key to be a valid first key.
        pos = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // "`" opens the terminal — the key every developer already reaches for.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;
      if (e.key === "`") {
        e.preventDefault();
        setTerminalOpen((o) => {
          if (!o) unlock("terminal");
          return !o;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reaching the end is its own small reward.
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.985 && progressRef.current <= 0.985) unlock("bottom");
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-accent"
      />
      <CommandPalette onOpenTerminal={() => setTerminalOpen(true)} />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <Toaster />
    </>
  );
}
