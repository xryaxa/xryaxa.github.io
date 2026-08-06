"use client";

import { WHY } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Reveal, TextReveal } from "@/components/ui/reveal";

export function Why() {
  return (
    <Section id="why" eyebrow="Why I build" separator>
      <TextReveal
        as="h2"
        text="Because a good interface is the closest thing to telepathy we have."
        className="max-w-4xl text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
      />

      <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.08}>
            <div className="relative border-t border-line pt-6">
              <span className="absolute -top-px left-0 h-px w-12 bg-accent" aria-hidden />
              <h3 className="text-lg font-semibold tracking-tight text-fg text-balance">
                {w.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{w.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
