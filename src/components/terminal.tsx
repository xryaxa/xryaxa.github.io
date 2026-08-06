"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { SITE, PROJECTS, SKILL_GROUPS } from "@/lib/content";
import { unlocked, ACHIEVEMENTS } from "@/lib/achievements";
import { toggleDevMode } from "@/lib/dev-mode";

type Line = { kind: "in" | "out" | "err"; text: string };

const BANNER: Line[] = [
  { kind: "out", text: "ryaxa shell — type `help` for commands" },
];

/** A small, honest fake shell. Every command returns real site data. */
export function Terminal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const push = (...next: Line[]) => setLines((l) => [...l, ...next]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    push({ kind: "in", text: cmd });
    setHistory((h) => [cmd, ...h]);
    setHistIndex(-1);

    const [name, ...args] = cmd.toLowerCase().split(/\s+/);

    switch (name) {
      case "help":
        push({
          kind: "out",
          text: [
            "whoami      who is behind this",
            "projects    what I've shipped",
            "skills      what I build with",
            "contact     how to reach me",
            "resume      download the CV",
            "achievements what you've found",
            "devmode     toggle the layout grid",
            "goto <id>   jump to a section",
            "clear       clean the screen",
            "exit        close the terminal",
          ].join("\n"),
        });
        break;

      case "whoami":
        push({
          kind: "out",
          text: `${SITE.fullName} (${SITE.name}) — ${SITE.role}, ${SITE.location}.\nSelf-taught. Founder of Nara. Looking for a team to get great with.`,
        });
        break;

      case "projects":
        push({
          kind: "out",
          text: PROJECTS.map(
            (p) => `${p.name.padEnd(22)} ${p.status.padEnd(15)} ${p.href ?? "private"}`,
          ).join("\n"),
        });
        break;

      case "skills":
        push({
          kind: "out",
          text: SKILL_GROUPS.map(
            (g) => `${g.title}\n  ${g.items.join(", ")}`,
          ).join("\n"),
        });
        break;

      case "contact":
        push({
          kind: "out",
          text: `email     ${SITE.email}\nlinkedin  ${SITE.linkedin}\ngithub    ${SITE.github}`,
        });
        break;

      case "resume":
        push({ kind: "out", text: "opening résumé…" });
        window.open(SITE.resume, "_blank", "noopener");
        break;

      case "achievements": {
        const have = unlocked();
        push({
          kind: "out",
          text: Object.values(ACHIEVEMENTS)
            .map(
              (a) =>
                `${have.includes(a.id) ? "[x]" : "[ ]"} ${a.title.padEnd(16)} ${
                  have.includes(a.id) ? a.hint : "???"
                }`,
            )
            .join("\n"),
        });
        break;
      }

      case "devmode":
        push({
          kind: "out",
          text: toggleDevMode() ? "developer mode on" : "developer mode off",
        });
        break;

      case "goto": {
        const id = args[0];
        const el = id ? document.getElementById(id) : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          onClose();
        } else {
          push({
            kind: "err",
            text: `no section "${id ?? ""}". try: hero, work, about, journey, stack, contact`,
          });
        }
        break;
      }

      case "sudo":
        push({
          kind: "out",
          text:
            args.join(" ") === "hire me"
              ? "permission granted. see you at the interview."
              : `${SITE.name} is not in the sudoers file. This incident has been reported.`,
        });
        break;

      case "clear":
        setLines(BANNER);
        break;

      case "exit":
        onClose();
        break;

      case "ls":
        push({ kind: "out", text: "hero  about  work  journey  stack  why  contact" });
        break;

      default:
        push({ kind: "err", text: `command not found: ${name} — try \`help\`` });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[92] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-[min(30rem,75vh)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-[#0b0b0f] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Terminal"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] tracking-widest text-dim uppercase">
                ryaxa — zsh
              </span>
              <button
                onClick={onClose}
                className="ml-auto text-dim hover:text-fg"
                aria-label="Close terminal"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-[12.5px] leading-6"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.kind === "in"
                      ? "text-fg"
                      : l.kind === "err"
                        ? "text-[#ff7b72]"
                        : "text-muted"
                  }
                >
                  {l.kind === "in" && <span className="text-accent">$ </span>}
                  <span className="whitespace-pre-wrap">{l.text}</span>
                </div>
              ))}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(value);
                  setValue("");
                }}
                className="mt-1 flex items-center gap-2"
              >
                <span className="text-accent">$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    // Up/down walks shell history, like a real prompt.
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const next = Math.min(histIndex + 1, history.length - 1);
                      if (next >= 0) {
                        setHistIndex(next);
                        setValue(history[next]);
                      }
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = histIndex - 1;
                      setHistIndex(next);
                      setValue(next >= 0 ? history[next] : "");
                    }
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent text-fg outline-none"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
