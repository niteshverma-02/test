"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { navigation, isActive } from "@/content/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/scroll";

const engines = ["var(--color-seo)", "var(--color-aeo)", "var(--color-geo)"];

/** Full-screen index for phones and tablets: giant numbered links wipe in one after another. */
export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  // Freeze the page behind the open menu.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-bg/95 pt-[var(--nav-h)] text-fg backdrop-blur-xl transition-[clip-path] duration-700 ease-[var(--ease-quart)] xl:hidden",
        open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
      )}
    >
      <nav aria-label="Menu" className="container-page flex flex-1 flex-col justify-center">
        <ol>
          {navigation.map((item, i) => (
            <li key={item.href} className="overflow-hidden border-b border-line">
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                className={cn(
                  "group flex items-baseline gap-4 py-3 transition-transform duration-700 ease-[var(--ease-expo)]",
                  open ? "translate-y-0" : "translate-y-full",
                )}
              >
                <span className="font-mono text-[12px] opacity-60">0{i + 1}</span>
                <span className="poster text-[clamp(2.4rem,11vw,5rem)] transition-colors group-hover:text-[var(--c)]" style={{ ["--c" as string]: engines[i % 3] }}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <div className="container-page label flex justify-between py-6 text-[10px] opacity-70">
        <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        <span>{profile.location.label}</span>
      </div>
    </div>
  );
}
