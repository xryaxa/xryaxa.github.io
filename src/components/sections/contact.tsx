"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { SITE } from "@/lib/content";
import { Reveal, TextReveal, Eyebrow } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ShyResumeButton } from "@/components/ui/shy-button";
import { Bloom, GridBackground } from "@/components/ui/backdrop";
import { unlock } from "@/lib/achievements";

export function Contact() {
  return (
    <section
      id="contact"
      className="hairline relative overflow-hidden scroll-mt-24 px-6 py-32 sm:px-8 md:py-44"
    >
      <GridBackground />
      <Bloom className="top-1/2" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Contact</Eyebrow>
        </Reveal>

        <TextReveal
          as="h2"
          text="Let's build something people remember."
          className="mt-7 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted text-balance">
            I am looking for a frontend internship where I can learn from people
            further along than me. If that is your team, I would love to talk.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={`mailto:${SITE.email}`} variant="accent" magnetic>
              <Mail className="size-4" aria-hidden />
              {SITE.email}
            </ButtonLink>
            <ButtonLink href={SITE.linkedin} variant="ghost" magnetic>
              <LinkedinIcon className="size-4" />
              LinkedIn
            </ButtonLink>
            <span onClick={() => unlock("resume")}>
              <ShyResumeButton href={SITE.resume} />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-xs text-dim transition-colors hover:text-muted"
          >
            <GithubIcon className="size-3.5" />
            github.com/xryaxa
            <span className="text-dim/70">
              — repositories are private, walkthrough on request
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
