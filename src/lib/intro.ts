/**
 * Lets the hero wait for the intro curtain. Resolves immediately when
 * the intro is skipped (repeat visit, reduced motion, no JS).
 */
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
  listeners.clear();
}

export function onIntroDone(callback: () => void) {
  if (done) {
    callback();
    return () => {};
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
