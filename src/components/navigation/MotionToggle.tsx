"use client";

import { Zap, ZapOff } from "lucide-react";
import { useSyncExternalStore } from "react";
import { motionAllowed, setMotionPref } from "@/lib/motion-pref";
import { cn } from "@/lib/cn";

const noop = () => () => {};
const useMotionOn = () => useSyncExternalStore(noop, motionAllowed, () => true);

/** Nav button: animations on / off for this site, whatever the system says. */
export function MotionToggle({ className }: { className?: string }) {
  const on = useMotionOn();
  return (
    <button
      type="button"
      onClick={() => setMotionPref(on ? "off" : "on")}
      aria-label={on ? "Turn animations off" : "Turn animations on"}
      title={on ? "Animations on" : "Animations off"}
      className={cn(
        "grid size-9 place-items-center rounded-none transition-colors duration-300",
        on ? "text-fg hover:bg-surface-2" : "bg-ember text-white",
        className,
      )}
    >
      {on ? <Zap aria-hidden className="size-[18px]" strokeWidth={1.75} /> : <ZapOff aria-hidden className="size-[18px]" strokeWidth={1.75} />}
    </button>
  );
}
