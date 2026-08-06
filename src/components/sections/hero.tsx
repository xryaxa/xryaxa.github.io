"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "motion/react";
import { useEffect } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import { SITE } from "@/lib/content";
import { Bloom, GridBackground, Particles, Spotlight } from "@/components/ui/backdrop";
import { ButtonLink } from "@/components/ui/button";
import { ShyResumeButton } from "@/components/ui/shy-button";
import { unlock } from "@/lib/achievements";
import { useLiteMode } from "@/lib/use-lite-mode";

const ROLES = ["Builder.", "Dreamer.", "Frontend Engineer.", "Future Founder."];

export function Hero() {
  const reduced = useReducedMotion();
  const lite = useLiteMode();
  // 3D tilt, layer drift and the scroll fade all force compositing on a
  // full-viewport element. Skipped on phones; the entrance animation stays.
  const still = reduced || lite;

  // Pointer parallax — the whole type block leans a few pixels toward the
  // cursor. Small enough to read as depth rather than movement.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 20 });
  const sy = useSpring(my, { stiffness: 45, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const layerX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const layerY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  // Fade + lift the hero as it scrolls away, so the next section feels like
  // it is arriving rather than the hero simply leaving.
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -60]);

  useEffect(() => {
    if (still) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, still]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      <GridBackground />
      <Bloom />
      <Particles />
      <Spotlight />

      {/* Fade the backdrop into the next section instead of cutting it off. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg"
      />

      <motion.div
        style={still ? undefined : { opacity: heroOpacity, y: heroY }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <motion.div
          style={
            still ? undefined : { rotateX, rotateY, transformPerspective: 1200 }
          }
          className="flex flex-col items-center text-center"
        >
          <div
            style={{ animationDelay: "0.15s" }}
            className="hero-rise mb-8 flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-muted"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Available for an internship
            <span className="text-dim">·</span>
            <MapPin className="size-3" aria-hidden />
            Baku
          </div>

          {/* The name. Layered so it drifts slightly against the roles below.
              The scale-in lives on the wrapper so it cannot fight the pointer
              parallax transform Motion writes onto the heading itself. */}
          <div className="hero-name">
            <motion.h1
              style={still ? undefined : { x: layerX, y: layerY }}
              className="text-gradient text-[clamp(3.5rem,17vw,13rem)] leading-[0.82] font-bold tracking-[-0.05em]"
            >
              RYAXA
            </motion.h1>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-x-5">
            {ROLES.map((role, i) => (
              <span
                key={role}
                style={{ animationDelay: `${0.5 + i * 0.09}s` }}
                className="hero-rise text-base font-medium tracking-tight text-muted sm:text-xl"
              >
                {role}
              </span>
            ))}
          </div>

          <p
            style={{ animationDelay: "0.9s" }}
            className="hero-rise mt-8 max-w-xl text-[15px] leading-relaxed text-dim text-balance sm:text-base"
          >
            I build interfaces people actually use — including{" "}
            <a
              href="https://nara.az"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Nara
            </a>
            , a white-label platform running in production for real businesses.
          </p>

          <div
            style={{ animationDelay: "1.05s" }}
            className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink href="#work" variant="accent" magnetic>
              See the work
            </ButtonLink>
            <span onClick={() => unlock("resume")}>
              <ShyResumeButton href={SITE.resume} />
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* The entrance animation ends at `transform: none`, which would wipe the
          -translate-x-1/2 that centres this. So the anchor keeps the position
          and an inner element carries the animation. */}
      <a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-dim transition-colors hover:text-fg"
      >
        <span style={{ animationDelay: "1.6s" }} className="hero-rise block">
          <motion.span
            animate={still ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="block"
          >
            <ArrowDown className="size-5" aria-hidden />
          </motion.span>
        </span>
      </a>
    </section>
  );
}
