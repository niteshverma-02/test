import { useSyncExternalStore } from "react";
import { motionAllowed } from "@/lib/motion-pref";

/*
 * Site-wide colour mode. The pre-paint script in layout.tsx sets
 * <html data-mode> from localStorage or the system preference, so the
 * first frame is already in the right theme.
 */

export type Mode = "light" | "dark";

const listeners = new Set<() => void>();

export function getMode(): Mode {
  return document.documentElement.dataset.mode === "light" ? "light" : "dark";
}

export function setMode(mode: Mode) {
  document.documentElement.dataset.mode = mode;
  try {
    localStorage.setItem("mode", mode);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMode() {
  return useSyncExternalStore(subscribe, getMode, () => "dark" as Mode);
}

/**
 * Switch mode with the circular reveal where the View Transitions API
 * exists. `origin` is the viewport point the new palette spreads from.
 */
export function switchMode(next: Mode, origin?: { x: number; y: number }) {
  const html = document.documentElement;
  const reduce = !motionAllowed();
  if (!document.startViewTransition || reduce) {
    setMode(next);
    return;
  }
  const x = origin?.x || window.innerWidth / 2;
  const y = origin?.y || window.innerHeight / 2;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  html.style.setProperty("--vt-x", `${x}px`);
  html.style.setProperty("--vt-y", `${y}px`);
  html.style.setProperty("--vt-r", `${r}px`);
  html.dataset.vt = "theme";
  const transition = document.startViewTransition(() => setMode(next));
  transition.finished.finally(() => {
    delete html.dataset.vt;
  });
}
