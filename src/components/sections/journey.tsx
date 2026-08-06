"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { JOURNEY } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // The spine fills as you read down the timeline.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section
      id="journey"
      eyebrow="Journey"
      title="How I got here"
      lead="Four years, compressed. The interesting part is the gap between the first two entries."
    >
      <div ref={ref} className="relative pl-10 sm:pl-14">
        {/* track */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px bg-line sm:left-[11px]"
        />
        {/* progress fill */}
        <motion.div
          aria-hidden
          style={reduced ? { scaleY: 1 } : { scaleY }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent to-accent/20 sm:left-[11px]"
        />

        <ol className="space-y-14">
          {JOURNEY.map((step, i) => (
            <li key={`${step.year}-${step.title}`} className="relative">
              <Reveal delay={i * 0.04}>
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-10 flex size-[15px] items-center justify-center rounded-full border border-line bg-bg sm:-left-14"
                >
                  <span className="size-1.5 rounded-full bg-accent" />
                </span>

                <div className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  {step.year}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-2xl leading-relaxed text-muted">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
