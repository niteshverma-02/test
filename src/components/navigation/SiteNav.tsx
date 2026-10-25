"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { useSyncExternalStore } from "react";
import { navigation, isActive } from "@/content/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { Monogram } from "@/components/ui/Monogram";
import { ThemeToggle } from "./ThemeToggle";
import { openPalette } from "./CommandPalette";
import { MotionToggle } from "./MotionToggle";
import { RollText } from "@/components/motion/RollText";
import { Magnetic } from "@/components/motion/Magnetic";

const noop = () => () => {};
const useShortcutLabel = () =>
  useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "⌘K",
  );

/** Thin translucent top bar. On phones the links live in the bottom TabBar instead. */
export function SiteNav() {
  const pathname = usePathname();
  const shortcut = useShortcutLabel();

  return (
    <>
      <header
        style={{ viewTransitionName: "site-nav" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[var(--glass)] backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${profile.identity.name} — home`}>
            <Monogram initials={profile.identity.initials} />
            <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight max-[359px]:sr-only">{profile.identity.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className={item.wide ? "hidden xl:block" : undefined}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300",
                        active ? "font-medium text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      <RollText>{item.label}</RollText>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search and quick actions"
              aria-keyshortcuts="Meta+K Control+K"
              className="hidden h-8 items-center gap-2 rounded-full border border-line pl-3 pr-1.5 text-[13px] text-muted transition-colors duration-300 hover:border-fg/20 hover:text-fg md:inline-flex"
            >
              <Search aria-hidden className="size-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="rounded-full bg-surface-2 px-2 py-0.5 font-sans text-[11px] font-medium">{shortcut}</kbd>
            </button>
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search and quick actions"
              className="grid size-9 place-items-center rounded-full text-fg transition-colors hover:bg-surface-2 md:hidden"
            >
              <Search aria-hidden className="size-[18px]" strokeWidth={1.75} />
            </button>
            <MotionToggle />
            <ThemeToggle />
            <span className="inline-block">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex h-8 items-center rounded-full bg-fg px-4 text-[13px] font-medium text-bg transition-opacity hover:opacity-85"
                >
                  <RollText>Hire me</RollText>
                </Link>
              </Magnetic>
            </span>
          </div>
        </div>
        <span aria-hidden className="scroll-progress" />
      </header>

    </>
  );
}
