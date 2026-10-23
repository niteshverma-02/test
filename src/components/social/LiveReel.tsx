"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { ReelPhoneMock } from "@/components/mocks/Mocks";
import { Tilt } from "@/components/motion/Tilt";
import { motionAllowed } from "@/lib/motion-pref";
import { profile } from "@/content/profile";

/* Illustrative reels and notifications, cycling like a live phone. */
const reels = [
  { hook: "POV: your brand finally has a content plan.", ping: "your.brand liked your reel ❤️" },
  { hook: "3 hooks that stop the scroll 👀", ping: "128 new followers this week ➕" },
  { hook: "Doctor myth #3, busted in 15 seconds.", ping: "Your reel is on Explore 🚀" },
  { hook: "Swipe → 30 days of content, planned.", ping: "“Saving this for later!” 💬" },
];

/** The hero phone: the reel changes, a like pops and a notification drops in on each beat. */
export function LiveReel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!motionAllowed()) return;
    const t = setInterval(() => setI((n) => (n + 1) % reels.length), 3200);
    return () => clearInterval(t);
  }, []);
  const r = reels[i];

  return (
    <div className="relative">
      <Tilt max={9}>
        <ReelPhoneMock
          className="w-full"
          hook={
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={r.hook}
                className="block"
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
              >
                {r.hook}
              </motion.span>
            </AnimatePresence>
          }
        />
      </Tilt>

      {/* Re-keyed each beat so the CSS pop replays. */}
      <span key={`heart-${i}`} aria-hidden className="like-pop pointer-events-none absolute left-1/2 top-[40%] z-10 -translate-x-1/2 opacity-0">
        <Heart className="size-24 fill-white text-white drop-shadow-[0_10px_30px_rgba(214,41,118,0.6)]" />
      </span>

      <div aria-hidden className="absolute inset-x-[-10%] top-[-7%] z-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={r.ping}
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="flex items-center gap-2.5 rounded-2xl border border-line bg-bg/90 p-2.5 shadow-[var(--shadow)] backdrop-blur-xl"
          >
            <span className="ig-gradient grid size-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white">{profile.identity.initials}</span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between text-[10px] text-muted">
                Instagram <span>now</span>
              </span>
              <span className="block truncate text-[12.5px] font-semibold">{r.ping}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
