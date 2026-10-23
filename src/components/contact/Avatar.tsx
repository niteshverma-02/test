import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

/** Tanu's DM avatar: initials on the IG gradient, optional story ring and green "active" dot. */
export function Avatar({ className, ring = false, active = false }: { className?: string; ring?: boolean; active?: boolean }) {
  return (
    <span aria-hidden className={cn("relative inline-block shrink-0 rounded-full", ring && "story-ring", className)}>
      <span className={cn("grid size-full place-items-center rounded-full bg-bg", ring && "p-[2px]")}>
        <span className="ig-gradient grid size-full place-items-center rounded-full font-display text-[0.8em] font-bold text-white">
          {profile.identity.initials}
        </span>
      </span>
      {active && <span className="absolute bottom-[4%] right-[4%] size-[24%] min-h-2 min-w-2 rounded-full border-2 border-bg bg-[#22c55e]" />}
    </span>
  );
}
