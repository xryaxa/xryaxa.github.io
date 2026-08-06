"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Braces,
  Compass,
  FileText,
  Home,
  Mail,
  Rocket,
  SquareTerminal,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/brand-icons";
import { SITE } from "@/lib/content";
import { unlock } from "@/lib/achievements";
import { toggleDevMode } from "@/lib/dev-mode";

type Item = {
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
  group: "Navigate" | "Links" | "Actions";
};

export function CommandPalette({
  onOpenTerminal,
}: {
  onOpenTerminal: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => {
          if (!o) unlock("palette");
          return !o;
        });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => () => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const open_ = (href: string) => () => {
    setOpen(false);
    window.open(href, href.startsWith("mailto:") ? "_self" : "_blank", "noopener");
  };

  const items: Item[] = [
    { label: "Top", icon: Home, group: "Navigate", run: go("hero") },
    { label: "Work", icon: Rocket, group: "Navigate", run: go("work") },
    { label: "About", icon: Compass, group: "Navigate", run: go("about") },
    { label: "Journey", icon: Compass, group: "Navigate", run: go("journey") },
    { label: "Stack", icon: Wrench, group: "Navigate", run: go("stack") },
    { label: "Contact", icon: Mail, group: "Navigate", run: go("contact") },

    {
      label: "Email me",
      hint: SITE.email,
      icon: Mail,
      group: "Links",
      run: open_(`mailto:${SITE.email}`),
    },
    {
      label: "LinkedIn",
      icon: LinkedinIcon,
      group: "Links",
      run: open_(SITE.linkedin),
    },
    { label: "GitHub", icon: GithubIcon, group: "Links", run: open_(SITE.github) },
    {
      label: "Nara — live product",
      hint: "nara.az",
      icon: ArrowUpRight,
      group: "Links",
      run: open_("https://nara.az"),
    },
    {
      label: "Download résumé",
      icon: FileText,
      group: "Links",
      run: () => {
        setOpen(false);
        unlock("resume");
        window.open(SITE.resume, "_blank", "noopener");
      },
    },

    {
      label: "Open terminal",
      hint: "playground",
      icon: SquareTerminal,
      group: "Actions",
      run: () => {
        setOpen(false);
        onOpenTerminal();
      },
    },
    {
      label: "Toggle developer mode",
      hint: "show the grid",
      icon: Braces,
      group: "Actions",
      run: () => {
        setOpen(false);
        toggleDevMode();
      },
    },
  ];

  const groups: Item["group"][] = ["Navigate", "Links", "Actions"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command palette" loop>
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Command.Input
                  autoFocus
                  placeholder="Jump to, open, or run something…"
                  className="w-full bg-transparent py-4 text-sm text-fg outline-none focus-visible:outline-none placeholder:text-dim"
                />
                <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[min(24rem,50vh)] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-8 text-center text-sm text-dim">
                  Nothing here. Try “work” or “email”.
                </Command.Empty>

                {groups.map((g) => (
                  <Command.Group
                    key={g}
                    heading={g}
                    className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-dim [&_[cmdk-group-heading]]:uppercase"
                  >
                    {items
                      .filter((i) => i.group === g)
                      .map((i) => (
                        <Command.Item
                          key={i.label}
                          value={`${i.label} ${i.hint ?? ""}`}
                          onSelect={i.run}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted data-[selected=true]:bg-accent/12 data-[selected=true]:text-fg"
                        >
                          <i.icon className="size-4 shrink-0 opacity-70" aria-hidden />
                          <span className="flex-1 truncate">{i.label}</span>
                          {i.hint && (
                            <span className="truncate font-mono text-[11px] text-dim">
                              {i.hint}
                            </span>
                          )}
                        </Command.Item>
                      ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
