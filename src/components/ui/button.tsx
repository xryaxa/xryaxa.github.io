"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:opacity-50";

const variants = {
  primary:
    "bg-fg text-black hover:bg-white px-6 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
  accent:
    "bg-accent text-black hover:bg-accent-soft px-6 py-3 shadow-[0_8px_30px_-8px_rgba(76,141,255,0.6)]",
  ghost:
    "border border-line bg-surface/40 text-fg hover:border-dim hover:bg-surface px-6 py-3 backdrop-blur-sm",
  quiet: "text-muted hover:text-fg px-3 py-2",
} as const;

type Variant = keyof typeof variants;

/** Anchor / link button. Magnetic hover is opt-in via `magnetic`. */
export function ButtonLink({
  href,
  variant = "ghost",
  className,
  children,
  magnetic = false,
  external,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const isExternal = external ?? /^https?:|^mailto:/.test(href);

  const content = isExternal ? (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(href.startsWith("mailto:")
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );

  return magnetic ? <Magnetic strength={0.28}>{content}</Magnetic> : content;
}

export function Button({
  variant = "ghost",
  className,
  children,
  magnetic = false,
  ...rest
}: {
  variant?: Variant;
  magnetic?: boolean;
} & ComponentProps<"button">) {
  const content = (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
  return magnetic ? <Magnetic strength={0.28}>{content}</Magnetic> : content;
}
