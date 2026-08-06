"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The résumé button that isn't sure about this.
 *
 * It dodges roughly every other hover — never on the first approach, and never
 * more than 5px, so it always stays clickable. Keyboard users get the plain
 * button with no dodging at all, and the whole gag is disabled under
 * prefers-reduced-motion. A joke that blocks the download stops being a joke.
 */
export function ShyResumeButton({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState(false);
  const hovers = useRef(0);

  const onEnter = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    hovers.current += 1;
    setTooltip(true);
    // Dodge on every second hover only — predictable enough to feel like a
    // joke rather than a broken button.
    if (hovers.current % 2 === 0) {
      const angle = Math.random() * Math.PI * 2;
      setOffset({ x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 });
    }
  };

  const onLeave = () => {
    setOffset({ x: 0, y: 0 });
    setTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <motion.a
        href={href}
        download
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 320, damping: 16 }}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onFocus={() => setTooltip(true)}
        onBlur={() => setTooltip(false)}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface/40 px-6 py-3 text-sm font-medium text-fg backdrop-blur-sm transition-colors hover:border-dim hover:bg-surface",
          className,
        )}
      >
        <FileText className="size-4" aria-hidden />
        Résumé
      </motion.a>

      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: tooltip ? 1 : 0, y: tooltip ? 0 : 4 }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
      >
        You sure?
      </motion.span>
    </div>
  );
}
