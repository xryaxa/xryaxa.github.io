"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Motion",
  "cmdk",
  "Lucide",
  "Static export",
  "GitHub Pages",
  "Geist",
];

const NOTES = [
  {
    k: "Rendering",
    v: "Statically exported. No server, no cold start — every route is a file on a CDN.",
  },
  {
    k: "Motion",
    v: "Every animation is transform or opacity only, and the particle canvas stops the moment it leaves the viewport.",
  },
  {
    k: "Accessibility",
    v: "Full keyboard paths, visible focus rings, and prefers-reduced-motion honoured everywhere — including the intro.",
  },
];

export function Stack() {
  const marquee = useRef<HTMLDivElement>(null);

  // An infinite animation keeps a compositor layer alive even when the section
  // is nowhere near the viewport. Pause it whenever it is not on screen.
  useEffect(() => {
    const el = marquee.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section
      id="stack"
      eyebrow="Colophon"
      title="This page, specifically"
      lead="Since you are a frontend engineer reading a frontend portfolio, here is exactly what it is made of."
    >
      {/* Marquee: duplicated once and translated -50%, so the loop is seamless. */}
      <Reveal>
        <div
          className="relative flex overflow-hidden border-y border-line py-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...STACK, ...STACK].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="shrink-0 font-mono text-lg tracking-tight whitespace-nowrap text-dim sm:text-xl"
              >
                {s}
                <span className="ml-10 text-accent/40">/</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {NOTES.map((n, i) => (
          <Reveal key={n.k} delay={i * 0.06} className="h-full">
            <div className="h-full bg-bg-soft p-7">
              <div className="font-mono text-[10.5px] tracking-[0.18em] text-dim uppercase">
                {n.k}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{n.v}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 font-mono text-xs text-dim">
          Press{" "}
          <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 text-fg">
            ⌘K
          </kbd>{" "}
          for the command palette,{" "}
          <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 text-fg">
            `
          </kbd>{" "}
          for a terminal. There is a Konami code somewhere too.
        </p>
      </Reveal>
    </Section>
  );
}
