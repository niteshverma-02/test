import { useCallback, useSyncExternalStore } from "react";

/** SSR-safe media query. Returns `fallback` on the server and during hydration. */
export function useMediaQuery(query: string, fallback = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}


export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)", false);
}
