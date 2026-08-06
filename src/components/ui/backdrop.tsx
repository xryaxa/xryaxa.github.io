"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useLiteMode } from "@/lib/use-lite-mode";

/** Static grid, drawn in CSS and faded out at the edges with a mask. */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a1a22 1px, transparent 1px), linear-gradient(to bottom, #1a1a22 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)",
        }}
      />
    </div>
  );
}

/**
 * Ambient accent glow that trails the pointer.
 * Purely decorative, so it is skipped entirely under reduced motion.
 */
export function Spotlight() {
  const reduced = useReducedMotion();
  const lite = useLiteMode();

  const x = useMotionValue(50);
  const y = useMotionValue(35);
  const sx = useSpring(x, { stiffness: 55, damping: 20 });
  const sy = useSpring(y, { stiffness: 55, damping: 20 });

  const background = useMotionTemplate`radial-gradient(620px circle at ${sx}% ${sy}%, rgba(76,141,255,0.11), transparent 68%)`;

  useEffect(() => {
    if (reduced || lite) return;
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 100);
      y.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, lite, x, y]);

  // A full-viewport gradient that repaints on every pointer move, for a
  // pointer that does not exist on touch. Nothing to keep here.
  if (reduced || lite) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ background }}
    />
  );
}

/**
 * Canvas particle field. Deliberately cheap: a small fixed particle count,
 * DPR capped at 2, and the loop stops whenever the tab is hidden or the
 * canvas scrolls out of view — this is the only continuously animating thing
 * on the page, so it must cost nothing when nobody is looking at it.
 */
export function Particles({
  count = 46,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const lite = useLiteMode();

  useEffect(() => {
    if (reduced || lite) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let dots: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.4 + 0.5,
        a: Math.random() * 0.4 + 0.15,
      }));
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,170,255,${d.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    seed();
    start();

    const onResize = () => {
      resize();
      seed();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, reduced, lite]);

  if (reduced || lite) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}

/**
 * Soft accent bloom anchored behind the hero type.
 *
 * A 110px blur over an 820px box is one of the most expensive things a phone
 * GPU can be asked to composite. In lite mode the blur filter is dropped and
 * the radial gradient is widened instead — visually near-identical, and free.
 */
export function Bloom({ className }: { className?: string }) {
  const lite = useLiteMode();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-1/3 left-1/2 h-[420px] w-[820px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full",
        !lite && "blur-[110px]",
        className,
      )}
      style={{
        background: lite
          ? "radial-gradient(ellipse at center, rgba(76,141,255,0.16), rgba(76,141,255,0.05) 40%, transparent 68%)"
          : "radial-gradient(ellipse at center, rgba(76,141,255,0.22), rgba(76,141,255,0.05) 45%, transparent 70%)",
      }}
    />
  );
}
