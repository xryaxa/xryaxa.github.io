"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

/**
 * Floating nav. Condenses on scroll and tracks the section in view with a
 * shared-layout pill, so there is exactly one moving indicator on screen.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500",
          // A blurred backdrop repaints on every scroll frame. Phones get a
          // near-opaque background instead, which reads the same and is free.
          scrolled
            ? "border-line bg-bg/95 md:bg-bg/80 md:backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#hero"
          className="mr-1 rounded-full px-3 py-1.5 font-mono text-sm font-semibold tracking-tight text-fg"
        >
          ryaxa
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-0.5 sm:flex">
          {LINKS.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                className={cn(
                  "relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active === l.id ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {l.label}
              </a>
              {active === l.id && !reduced && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-surface"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <span
          className="ml-1 hidden items-center gap-1 rounded-full border border-line px-2.5 py-1.5 font-mono text-[11px] text-dim md:flex"
          aria-hidden
        >
          <Command className="size-3" />K
        </span>
      </nav>
    </header>
  );
}
