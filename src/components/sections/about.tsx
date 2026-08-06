"use client";

import { Section } from "@/components/ui/section";
import { Reveal, TextReveal } from "@/components/ui/reveal";

const FACTS = [
  { value: "9", label: "Projects shipped" },
  { value: "1", label: "Product in production" },
  { value: "4", label: "Languages spoken" },
  { value: "0", label: "CS degrees" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About">
      <div className="grid gap-14 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <TextReveal
            as="h2"
            text="I never got taught this. I went and got it."
            className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl"
          />

          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
            <Reveal delay={0.1}>
              <p>
                I study geology. Nobody handed me a computer science degree, a
                bootcamp or a mentor — I started with an empty folder and a
                browser tab, and I kept going because the feedback loop was the
                most addictive thing I had ever found.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Nine repositories later I run{" "}
                <span className="text-fg">Nara</span>, a white-label platform
                that meal-subscription businesses use to handle their clients,
                menus, deliveries and payroll. I designed it, built the
                frontend, and shipped it to people who complain to me directly
                when something breaks. That is the best teacher I have found.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                I work with AI every day — Claude Code sits in my terminal the
                way an IDE sits on my desktop. It has not made me lazy; it has
                made me faster at the part I actually care about, which is
                deciding what should exist and how it should feel.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-fg">
                I want to build a company. I have started. Now I want to get
                very good, next to people who already are.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {FACTS.map((f, i) => (
              <Reveal key={f.label} delay={0.06 * i}>
                <div className="h-full bg-bg-soft px-5 py-7">
                  <div className="text-4xl font-semibold tracking-tight text-fg">
                    {f.value}
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] leading-tight tracking-wider text-dim uppercase">
                    {f.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <blockquote className="mt-6 rounded-2xl border border-line bg-surface/40 p-6">
              <p className="text-[15px] leading-relaxed text-muted italic">
                “The last one is the number I am proudest of and least proud
                of at the same time.”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
