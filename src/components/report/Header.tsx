"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Search } from "lucide-react";
import { navigation, isActive } from "@/content/navigation";
import { profile } from "@/content/profile";
import { openPalette } from "@/components/navigation/CommandPalette";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/cn";
import { Menu } from "./Menu";
import { RollText } from "./RollText";

/**
 * A floating glass bar, always pinned: monogram + name, links with a pill that
 * glides to the hovered/active item, search, theme and a coral "Let's talk".
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const activeHref = navigation.find((n) => isActive(pathname, n.href))?.href ?? null;
  const pill = hover ?? activeHref;

  return (
    <>
      <header style={{ viewTransitionName: "site-nav" }} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-[var(--gutter)]">
        <div className="relative mx-auto flex h-14 max-w-[88rem] items-center gap-3 overflow-hidden rounded-2xl border border-line bg-surface/70 pl-2 pr-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150">
          <Link href="/" className="group flex items-center gap-3 rounded-xl py-1 pl-1 pr-3" aria-label={`${profile.identity.name} — home`}>
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-ember via-[#ff9a6b] to-geo text-[15px] font-semibold tracking-tight text-bg">
              {profile.identity.initials}
              <span aria-hidden className="absolute inset-0 translate-y-full bg-white/25 transition-transform duration-500 group-hover:translate-y-0" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[15px] font-semibold tracking-tight">{profile.identity.name}</span>
              <span className="flex items-center gap-1.5 text-[11px] text-muted">
                <span aria-hidden className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-geo opacity-70" />
                  <span className="relative size-1.5 rounded-full bg-geo" />
                </span>
                SEO · AEO · GEO
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="mx-auto hidden lg:block" onPointerLeave={() => setHover(null)}>
            <ul className="flex items-center">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className={item.wide ? "hidden xl:block" : undefined}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onPointerEnter={() => setHover(item.href)}
                      onFocus={() => setHover(item.href)}
                      onBlur={() => setHover(null)}
                      className={cn("relative block rounded-xl px-3.5 py-2 text-[14px] font-medium transition-colors duration-300", active || pill === item.href ? "text-fg" : "text-muted")}
                    >
                      {pill === item.href && (
                        <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-xl bg-fg/[0.08]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                      )}
                      <RollText>{item.label}</RollText>
                      {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-ember" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search the site"
              aria-keyshortcuts="Meta+K Control+K"
              className="hidden h-10 items-center gap-2 rounded-xl px-3 text-[13px] text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg md:flex"
            >
              <Search aria-hidden className="size-4" />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
            </button>
            <button type="button" onClick={openPalette} aria-label="Search the site" className="grid size-10 place-items-center rounded-xl hover:bg-fg/[0.06] md:hidden">
              <Search aria-hidden className="size-[18px]" />
            </button>
            <ThemeToggle className="!rounded-xl" />
            <span className="hidden sm:inline-block">
              <Magnetic strength={0.25}>
                <Link
                  href="/contact"
                  data-cursor="Say hi"
                  className="group ml-1 inline-flex h-10 items-center gap-1.5 rounded-xl bg-ember px-4 text-[14px] font-semibold text-bg transition-[filter] hover:brightness-110"
                >
                  Let&rsquo;s talk
                  <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-xl bg-fg/[0.08] xl:hidden"
            >
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className={cn("h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300", open && "translate-y-[3.25px] rotate-45")} />
                <span className={cn("h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300", open && "-translate-y-[3.25px] -rotate-45")} />
              </span>
            </button>
          </div>
          <span aria-hidden className="scroll-progress absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-ember via-geo to-aeo" />
        </div>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
