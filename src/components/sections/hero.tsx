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

const EASE = [0.16, 1, 0.3, 1] as const;
const ROLES = ["Builder.", "Dreamer.", "Frontend Engineer.", "Future Founder."];

export function Hero() {
  const reduced = useReducedMotion();

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
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

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
        style={reduced ? undefined : { opacity: heroOpacity, y: heroY }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <motion.div
          style={
            reduced
              ? undefined
              : { rotateX, rotateY, transformPerspective: 1200 }
          }
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="mb-8 flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-muted backdrop-blur-sm"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Available for an internship
            <span className="text-dim">·</span>
            <MapPin className="size-3" aria-hidden />
            Baku
          </motion.div>

          {/* The name. Layered so it drifts slightly against the roles below. */}
          <motion.h1
            style={reduced ? undefined : { x: layerX, y: layerY }}
            initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.05, ease: EASE }}
            className="text-gradient text-[clamp(3.5rem,17vw,13rem)] leading-[0.82] font-bold tracking-[-0.05em]"
          >
            RYAXA
          </motion.h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-x-5">
            {ROLES.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.09,
                  ease: EASE,
                }}
                className="text-base font-medium tracking-tight text-muted sm:text-xl"
              >
                {role}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-dim text-balance sm:text-base"
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
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink href="#work" variant="accent" magnetic>
              See the work
            </ButtonLink>
            <span onClick={() => unlock("resume")}>
              <ShyResumeButton href={SITE.resume} />
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-dim transition-colors hover:text-fg"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown className="size-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
