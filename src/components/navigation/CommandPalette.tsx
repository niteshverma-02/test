"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  CodeXml,
  Copy,
  CornerDownLeft,
  FileDown,
  FolderOpen,
  Sparkles,
  House,
  Layers,
  Mail,
  PartyPopper,
  Search,
  Send,
  SunMoon,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { navigation } from "@/content/navigation";
import { categoryLabels, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { confetti } from "@/lib/confetti";
import { getMode, switchMode } from "@/lib/theme";
import { motionAllowed, setMotionPref } from "@/lib/motion-pref";
import { getLenis, scrollToTarget } from "@/lib/scroll";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/cn";

const OPEN_EVENT = "palette:open";

/** Opens the palette from anywhere (nav button, terminal, …). */
export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Group = "Pages" | "Projects" | "Actions" | "Links";
type Command = { id: string; label: string; group: Group; hint: string; icon: LucideIcon; keywords?: string; run: () => void };

const groups: Group[] = ["Pages", "Projects", "Actions", "Links"];
const pageIcons: Record<string, LucideIcon> = {
  "/": House,
  "/work": FolderOpen,
  "/services": Sparkles,
  "/skills": Layers,
  "/experience": BriefcaseBusiness,
  "/about": UserRound,
  "/contact": Send,
};

/** Higher is better; 0 hides the command. */
function score(cmd: Command, q: string) {
  if (!q) return 1;
  const label = cmd.label.toLowerCase();
  if (label.startsWith(q)) return 4;
  if (label.includes(q)) return 3;
  if (cmd.keywords?.toLowerCase().includes(q)) return 2;
  let i = 0;
  for (const ch of label) if (ch === q[i]) i++;
  return i === q.length ? 1 : 0;
}

/** ⌘K / Ctrl K: jump to any page or project, or run a quick action. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const external = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...navigation.map((n) => ({ id: `page-${n.href}`, label: n.label, group: "Pages" as const, hint: "Page", icon: pageIcons[n.href] ?? House, run: go(n.href) })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        label: p.name,
        group: "Projects" as const,
        hint: categoryLabels[p.category],
        icon: FolderOpen,
        keywords: `${p.stack.join(" ")} ${p.kind}`,
        run: go(`/work/${p.slug}`),
      })),
      {
        id: "theme",
        label: "Switch theme",
        group: "Actions",
        hint: "Light / dark",
        icon: SunMoon,
        keywords: "dark light mode",
        run: () => switchMode(getMode() === "dark" ? "light" : "dark"),
      },
      {
        id: "motion",
        label: "Animations on / off",
        group: "Actions",
        hint: "For this site",
        icon: Zap,
        keywords: "motion reduce animation effects",
        run: () => setMotionPref(motionAllowed() ? "off" : "on"),
      },
      {
        id: "copy-email",
        label: "Copy email",
        group: "Actions",
        hint: profile.contact.email,
        icon: Copy,
        keywords: "contact mail",
        run: () => {
          navigator.clipboard?.writeText(profile.contact.email).then(
            () => toast("Email copied — talk soon!"),
            () => toast(profile.contact.email),
          );
        },
      },
      { id: "mail", label: "Send an email", group: "Actions", hint: "Opens your mail app", icon: Mail, keywords: "contact hire", run: () => (window.location.href = `mailto:${profile.contact.email}`) },
      ...(profile.cv.href ? [{ id: "cv", label: "Download CV", group: "Actions" as const, hint: "PDF", icon: FileDown, keywords: "resume", run: external(profile.cv.href) }] : []),
      { id: "top", label: "Back to top", group: "Actions", hint: "Scroll up", icon: ArrowUp, run: () => scrollToTarget(0) },
      {
        id: "party",
        label: "Celebrate",
        group: "Actions",
        hint: "Try it",
        icon: PartyPopper,
        keywords: "confetti fun party",
        run: () => {
          confetti();
          toast("Thanks for stopping by!");
        },
      },
      ...profile.social
        .filter((s) => s.href)
        .map((s) => ({ id: `link-${s.label}`, label: s.label, group: "Links" as const, hint: "Opens in a new tab", icon: s.label === "GitHub" ? CodeXml : ArrowUpRight, run: external(s.href!) })),
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = commands.map((c) => ({ c, s: score(c, q) })).filter((r) => r.s > 0);
    return groups.flatMap((g) =>
      matched
        .filter((r) => r.c.group === g)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.c),
    );
  }, [commands, query]);

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    hide();
    // Let the dialog start closing before navigating or switching theme.
    requestAnimationFrame(() => cmd.run());
  };

  // Global shortcut: ⌘K / Ctrl K toggles; "/" opens when not typing.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) hide();
        else show();
        return;
      }
      if (e.key === "Escape" && open) {
        hide();
        return;
      }
      const t = e.target as HTMLElement;
      if (e.key === "/" && !open && !t.closest("input, textarea, select, [contenteditable]")) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, show, hide]);

  // While open: freeze the page, focus the field, then restore focus on close.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    inputRef.current?.focus();
    const back = returnFocus.current;
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
      back?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((a) => (results.length ? (a + step + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.25 }}
        >
          <div aria-hidden className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={hide} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search and quick actions"
            initial={{ opacity: 0, scale: 0.94, y: -12, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -6, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="beam relative w-full max-w-xl overflow-hidden rounded-[24px] border border-line bg-[var(--glass)] shadow-[var(--shadow)] backdrop-blur-2xl backdrop-saturate-150"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search aria-hidden className="size-[18px] shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                aria-autocomplete="list"
                placeholder="Search pages, projects, actions…"
                className="h-14 min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-subtle"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-sans text-[11px] text-muted">esc</kbd>
            </div>

            <div ref={listRef} id={listId} role="listbox" aria-label="Results" className="max-h-[min(56vh,420px)] overflow-y-auto overscroll-contain p-2" data-lenis-prevent>
              {results.length === 0 && <p className="px-3 py-10 text-center text-[15px] text-muted">No results for &ldquo;{query}&rdquo;</p>}
              {results.map((cmd, i) => {
                const header = i === 0 || results[i - 1].group !== cmd.group ? cmd.group : null;
                const selected = i === active;
                const Icon = cmd.icon;
                return (
                  <div key={cmd.id} role="presentation">
                    {header && <p className="px-3 pb-1.5 pt-3 text-[12px] font-semibold text-muted">{header}</p>}
                    <div
                      id={`${listId}-${cmd.id}`}
                      role="option"
                      aria-selected={selected}
                      onPointerMove={() => !selected && setActive(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => run(cmd)}
                      className="relative flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5"
                    >
                      {selected && (
                        <motion.span
                          layoutId="palette-active"
                          className="absolute inset-0 -z-10 rounded-2xl bg-surface-2"
                          transition={{ type: "spring", stiffness: 500, damping: 38 }}
                        />
                      )}
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                          selected ? "ig-gradient text-white" : "bg-surface text-fg",
                        )}
                      >
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{cmd.label}</span>
                      <span className="hidden truncate text-[13px] text-muted sm:block">{cmd.hint}</span>
                      <CornerDownLeft aria-hidden className={cn("size-4 shrink-0 text-muted transition-opacity", selected ? "opacity-100" : "opacity-0")} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 text-[12px] text-muted">
              <span className="flex items-center gap-3">
                <span>
                  <kbd className="font-sans">↑↓</kbd> move
                </span>
                <span>
                  <kbd className="font-sans">↵</kbd> open
                </span>
              </span>
              <span className="truncate">Psst… there&rsquo;s a secret code.</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
