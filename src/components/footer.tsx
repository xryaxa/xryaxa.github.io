import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="hairline px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {SITE.fullName} — built in Baku
        </p>
        <p className="font-mono text-xs text-dim">
          Next.js · React · TypeScript · Tailwind · Motion
        </p>
      </div>
    </footer>
  );
}
