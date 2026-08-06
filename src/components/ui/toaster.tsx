"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Trophy } from "lucide-react";
import { onAchievement, type Achievement } from "@/lib/achievements";

/** Bottom-right achievement toasts. Auto-dismiss, stack, never block clicks. */
export function Toaster() {
  const [queue, setQueue] = useState<(Achievement & { key: number })[]>([]);

  useEffect(() => {
    return onAchievement((a) => {
      const key = Date.now() + Math.random();
      setQueue((q) => [...q, { ...a, key }]);
      window.setTimeout(
        () => setQueue((q) => q.filter((i) => i.key !== key)),
        4200,
      );
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-[min(20rem,calc(100vw-2.5rem))] flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {queue.map((a) => (
          <motion.div
            key={a.key}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-line bg-surface/95 p-3.5 backdrop-blur-md"
          >
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Trophy className="size-4" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-fg">{a.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{a.hint}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
