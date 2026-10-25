"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Send, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { navigation, isActive } from "@/content/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  "/": House,
  "/work": TrendingUp,
  "/services": Sparkles,
  "/contact": Send,
};

/** Phone navigation: an Instagram-style bottom tab bar. About is the profile tab. */
export function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-[var(--glass)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 lg:hidden"
    >
      <ul className="mx-auto grid h-[3.75rem] max-w-md grid-cols-5">
        {navigation.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = icons[item.href];
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors", active ? "text-fg" : "text-muted")}
              >
                {Icon ? (
                  <Icon aria-hidden className="size-[22px]" strokeWidth={active ? 2.4 : 1.75} />
                ) : (
                  <span className={cn("rounded-full p-[2px]", active ? "story-ring" : "ring-1 ring-line")}>
                    <span className="ig-gradient grid size-[20px] place-items-center rounded-full text-[8px] font-bold text-white">{profile.identity.initials}</span>
                  </span>
                )}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
