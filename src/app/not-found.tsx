import type { Metadata } from "next";
import Link from "next/link";
import { GridBackground } from "@/components/ui/backdrop";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <GridBackground />

      <div className="relative z-10 text-center">
        <p className="font-mono text-[clamp(5rem,20vw,12rem)] leading-none font-bold tracking-tighter text-gradient">
          404
        </p>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          I probably forgot a semicolon.
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          This page does not exist — or it did, and I refactored it away at 2am
          with great confidence.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white"
          >
            Take me home
          </Link>
          <Link
            href="/#work"
            className="rounded-full border border-line bg-surface/40 px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-dim hover:bg-surface"
          >
            Show me the work
          </Link>
        </div>

        <p className="mt-10 font-mono text-xs text-dim">
          error: ENOENT — no such file or directory
        </p>
      </div>
    </div>
  );
}
