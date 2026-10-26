/*
 * The intro loader (pure CSS, timed by the pre-paint script in layout.tsx)
 * holds <html class="loading"> and adds "revealing" as the curtain parts.
 * onIntroDone runs its callback at that moment — or at once with no loader.
 */
export function onIntroDone(cb: () => void) {
  const html = document.documentElement;
  const ready = () => !html.classList.contains("loading") || html.classList.contains("revealing");
  if (ready()) {
    cb();
    return () => {};
  }
  const mo = new MutationObserver(() => {
    if (!ready()) return;
    mo.disconnect();
    cb();
  });
  mo.observe(html, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
