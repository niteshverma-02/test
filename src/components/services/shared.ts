import { services } from "@/content/services";
import { getLenis } from "@/lib/scroll";
import { motionAllowed } from "@/lib/motion-pref";

/** One Search & AI-palette tint per service post, reused by its story highlight. */
export const tints = [
  "linear-gradient(150deg, #2563eb, #06b6d4 55%, #10b981)",
  "linear-gradient(150deg, #8b5cf6, #6366f1 55%, #3b82f6)",
  "linear-gradient(150deg, #10b981, #0d9488 60%, #2563eb)",
  "linear-gradient(150deg, #1d4ed8, #4f46e5 65%, #8b5cf6)",
  "linear-gradient(150deg, #ff4500, #7c3aed 60%, #2563eb)",
  "linear-gradient(150deg, #f59e0b, #06b6d4 50%, #3b82f6)",
  "linear-gradient(150deg, #4f46e5, #06b6d4 65%, #10b981)",
];

export const postId = (i: number) => `post-${services[i].short.toLowerCase().replace(/\W+/g, "-")}`;

/** Scroll a section into view just below the fixed nav, through Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return null;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.4 });
  else el.scrollIntoView({ behavior: motionAllowed() ? "smooth" : "auto" });
  return el;
}

/** Scroll to a service post, focus its carousel and pulse it so the eye lands on it. */
export function jumpTo(i: number) {
  const el = scrollToId(postId(i));
  if (!el) return;
  el.querySelector<HTMLElement>("[data-carousel]")?.focus({ preventScroll: true });
  if (motionAllowed())
    el.animate([{ scale: 1 }, { scale: 0.97 }, { scale: 1 }], { duration: 700, delay: 900, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
}
