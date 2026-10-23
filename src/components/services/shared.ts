import { services } from "@/content/services";
import { getLenis } from "@/lib/scroll";
import { motionAllowed } from "@/lib/motion-pref";

/** One Instagram-palette tint per service post, reused by its story highlight. */
export const tints = [
  "linear-gradient(150deg, #feda75, #fa7e1e 45%, #d62976)",
  "linear-gradient(150deg, #fa7e1e, #d62976 55%, #962fbf)",
  "linear-gradient(150deg, #d62976, #962fbf 60%, #4f5bd5)",
  "linear-gradient(150deg, #962fbf, #4f5bd5 70%, #2b3a9e)",
  "linear-gradient(150deg, #4f5bd5, #962fbf 50%, #d62976)",
  "linear-gradient(150deg, #1a0a12, #962fbf 65%, #fa7e1e)",
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
