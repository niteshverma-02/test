/*
 * Whether the page animates. Motion is the point of this portfolio, so it
 * is on by default — even when the system asks for reduced motion — and
 * visitors can switch it off with the toggle in the nav.
 *
 * The decision is made once, before first paint, by the inline script in
 * layout.tsx: it puts `motion-ok` or `motion-off` on <html>. Everything
 * else reads that class. Changing the preference reloads the page.
 */

const KEY = "motion";

/** Inline, pre-paint: sets <html class="motion-ok | motion-off">. */
export const motionScript = `var m;try{m=localStorage.getItem("${KEY}")}catch(e){}d.classList.add(m==="off"?"motion-off":"motion-ok");`;

export function motionAllowed() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("motion-ok");
}

export function setMotionPref(pref: "on" | "off") {
  try {
    localStorage.setItem(KEY, pref);
  } catch {}
  window.location.reload();
}
