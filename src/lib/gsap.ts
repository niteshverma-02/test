import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

const allowed = () => typeof document !== "undefined" && document.documentElement.classList.contains("motion-ok");

/**
 * Shared media conditions for gsap.matchMedia(). `motion` follows the
 * site's own motion switch (see lib/motion-pref.ts), so it is a query that
 * always or never matches rather than the raw system setting.
 */
export const MQ = {
  get motion() {
    return allowed() ? "(min-width: 0px)" : "(max-width: 0px)";
  },
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
};
