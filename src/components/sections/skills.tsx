"use client";

import { motion, useReducedMotion } from "motion/react";
import { SKILL_GROUPS } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="What I build with"
      lead="Listed honestly: these are the things I have actually shipped something with, not the things I have watched a video about."
      separator={false}
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {SKILL_GROUPS.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.06} className="h-full">
            <div className="h-full bg-bg-soft p-7">
              <h3 className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reduced ? undefined : { opacity: 0, y: 8 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.035 }}
                    whileHover={reduced ? undefined : { y: -2 }}
                    className="cursor-default rounded-lg border border-line bg-surface/50 px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-fg"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
