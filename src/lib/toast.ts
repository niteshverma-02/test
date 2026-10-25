import { useSyncExternalStore } from "react";

/** One short message at a time, shown by <Toaster />. */
export type Toast = { id: number; message: string };

let current: Toast | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toast(message: string) {
  current = { id: Date.now(), message };
  emit();
  clearTimeout(timer);
  timer = setTimeout(() => {
    current = null;
    emit();
  }, 2800);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useToast() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
