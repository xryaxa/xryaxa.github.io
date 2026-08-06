import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal } from "./reveal";

/**
 * One section shell for the whole page: consistent vertical rhythm, max width,
 * hairline separator and heading treatment. Sections differ in content, never
 * in spacing.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  wide = false,
  separator = true,
}: {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  wide?: boolean;
  separator?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-6 py-24 sm:px-8 md:py-32",
        separator && "hairline",
        className,
      )}
    >
      <div className={cn("mx-auto w-full", wide ? "max-w-7xl" : "max-w-5xl")}>
        {(eyebrow || title || lead) && (
          <header className="mb-14 md:mb-20">
            {eyebrow && (
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                  {title}
                </h2>
              </Reveal>
            )}
            {lead && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-balance">
                  {lead}
                </p>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
