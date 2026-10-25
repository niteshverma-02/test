"use client";

import { useSyncExternalStore } from "react";

const formatters = new Map<string, Intl.DateTimeFormat>();

function format(timeZone: string) {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
    formatters.set(timeZone, f);
  }
  return f.format(Date.now());
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

/** Live clock for the configured time zone. Renders "--:--" on the server. */
export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => format(timeZone),
    () => "--:--",
  );
  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
