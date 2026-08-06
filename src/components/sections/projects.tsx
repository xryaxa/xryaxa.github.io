"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useLiteMode } from "@/lib/use-lite-mode";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <Section
      id="work"
      wide
      eyebrow="Selected work"
      title={
        <>
          Things I built that
          <br />
          <span className="text-dim">other people rely on.</span>
        </>
      }
      lead="Not exercises. Not clones. Products with users, deadlines and consequences — which is the only way I have ever learned anything."
    >
      <div className="mt-4 flex flex-col gap-28 md:gap-40">
        {PROJECTS.map((project, i) => (
          <ProjectBlock key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const lite = useLiteMode();
  // Scroll-linked rotation on a full-width screenshot repaints a large layer
  // on every frame, once per project. This was the main source of phone jank.
  const still = reduced || lite;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // A few degrees of rotation and a little lift as the block passes through
  // the viewport. Enough to feel alive, not enough to notice consciously.
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [3.5, 0, -3.5]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  const flip = index % 2 === 1;

  return (
    <article ref={ref} className="relative">
      <div
        className={cn(
          "grid items-start gap-10 lg:grid-cols-12 lg:gap-14",
        )}
      >
        {/* ---- sticky identity column ---- */}
        <div
          className={cn(
            "lg:col-span-5 lg:sticky lg:top-28",
            flip && "lg:order-2 lg:col-start-8",
          )}
        >
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-5 bg-line" />
              <span>{project.year}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.name}
            </h3>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-3 text-lg text-muted text-balance">{project.tagline}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <StatusPill status={project.status} accent={project.accent} />
              <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-dim">
                {project.role}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 leading-relaxed text-muted">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          {project.href ? (
            <Reveal delay={0.2}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg"
              >
                <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                  {project.href.replace(/^https?:\/\//, "")}
                </span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          ) : (
            <Reveal delay={0.2}>
              <p className="mt-7 inline-flex items-center gap-1.5 font-mono text-xs text-dim">
                <Lock className="size-3.5" aria-hidden />
                Private repository — walkthrough on request
              </p>
            </Reveal>
          )}
        </div>

        {/* ---- scrolling detail column ---- */}
        <div
          className={cn(
            "lg:col-span-7",
            flip && "lg:order-1 lg:col-start-1 lg:row-start-1",
          )}
        >
          <motion.div
            style={still ? undefined : { rotate, y, scale }}
            className="relative"
          >
            <Preview project={project} />
          </motion.div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-bg-soft px-4 py-5">
                <div className="text-xl font-semibold tracking-tight text-fg">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10.5px] tracking-wider text-dim uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Detail label="The hard part" body={project.challenge} />
            <Detail label="What it taught me" body={project.lesson} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Detail({ label, body }: { label: string; body: string }) {
  return (
    <Reveal>
      <div className="border-l border-line pl-5">
        <div className="font-mono text-[10.5px] tracking-[0.18em] text-dim uppercase">
          {label}
        </div>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{body}</p>
      </div>
    </Reveal>
  );
}

function StatusPill({ status, accent }: { status: string; accent?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px]"
      style={{
        borderColor: `${accent ?? "#4c8dff"}40`,
        color: accent ?? "#4c8dff",
        backgroundColor: `${accent ?? "#4c8dff"}12`,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: accent ?? "#4c8dff" }}
        aria-hidden
      />
      {status}
    </span>
  );
}

/**
 * Screenshot, or a typographic stand-in when the project has no public UI to
 * show. The placeholder is deliberately designed rather than a grey box — a
 * missing image should still look like a decision.
 */
function Preview({ project }: { project: Project }) {
  const accent = project.accent ?? "#4c8dff";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-line bg-bg-soft"
      style={{ boxShadow: `0 30px 80px -40px ${accent}55` }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-surface/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
        <span className="size-2.5 rounded-full bg-[#28c840]/70" />
        <span className="ml-3 truncate rounded-md bg-bg/60 px-2.5 py-1 font-mono text-[10.5px] text-dim">
          {project.href?.replace(/^https?:\/\//, "") ?? `${project.slug} · local`}
        </span>
      </div>

      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.name} interface`}
          width={1440}
          height={900}
          quality={82}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="w-full transition-transform duration-700 group-hover:scale-[1.015]"
        />
      ) : (
        <div
          className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${accent}22, transparent 60%), #0a0a0d`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, #17171d 1px, transparent 1px), linear-gradient(to bottom, #17171d 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
          <div className="relative text-center">
            <div
              className="font-mono text-5xl font-bold tracking-tighter sm:text-7xl"
              style={{ color: `${accent}` }}
            >
              {project.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <div className="mt-3 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
              {project.status}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
