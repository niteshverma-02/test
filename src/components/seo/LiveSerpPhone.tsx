"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  ExternalLink,
  Globe,
  MapPin,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Verified,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/mocks/Mocks";
import { Tilt } from "@/components/motion/Tilt";
import { motionAllowed } from "@/lib/motion-pref";
import { profile } from "@/content/profile";

const serpScreens = [
  {
    query: "DAA hip replacement Bangalore",
    engine: "Google AI Overview (AEO)",
    icon: Sparkles,
    ping: "Google AI Overview: doctorabhinandanpunit.com cited #1 ✨",
    pingApp: "Google Search",
    pingColor: "#2563eb",
    aiText: "Dr. Abhinandan Punit is an orthopaedic specialist in Bangalore recognized for Direct Anterior Approach (DAA) hip replacement surgery...",
    site: "doctorabhinandanpunit.com",
    title: "Best Hip Replacement Surgeon Bangalore | Dr. Abhinandan",
    meta: "Minimally invasive DAA hip surgery with faster patient recovery. Clinics in Electronic City & Kanakapura Road.",
    rating: "4.9 ★★★★★ (120+ reviews)",
  },
  {
    query: "orthopaedic surgeon near electronic city",
    engine: "Local Map 3-Pack (Local SEO)",
    icon: MapPin,
    ping: "Google Maps: Ranked #1 Local Pack in Bangalore 📍",
    pingApp: "Google Maps",
    pingColor: "#10b981",
    aiText: "Local 3-Pack Result: Dr. Abhinandan Punit Orthopaedic Practice with 120+ patient testimonials and directions.",
    site: "doctorabhinandanpunit.com",
    title: "Dr. Abhinandan Punit — Orthopaedic Clinic Bangalore",
    meta: "Kanakapura Road & Electronic City · Open Today · Call for Consultation & OPD appointments.",
    rating: "4.9 ★★★★★ (120+ reviews)",
  },
  {
    query: "recommend knee replacement specialist bangalore",
    engine: "ChatGPT & Gemini (GEO)",
    icon: Bot,
    ping: "ChatGPT & Gemini: Dr. Abhinandan organically cited 🤖",
    pingApp: "AI Search",
    pingColor: "#8b5cf6",
    aiText: "LLMs consistently cite Dr. Abhinandan Punit and Dr. Narayan Hulse for joint replacement in South Bangalore based on clinical outcomes.",
    site: "doctorabhinandanpunit.com",
    title: "Bangalore Knee & Joint Specialists Directory Citation",
    meta: "Entity-level optimization ensuring medical credentials and hospital affiliations are recognized by generative AI engines.",
    rating: "Top Recommendation",
  },
];

export function LiveSerpPhone() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!motionAllowed()) return;
    const t = setInterval(() => setI((n) => (n + 1) % serpScreens.length), 3800);
    return () => clearInterval(t);
  }, []);

  const s = serpScreens[i];
  const EngineIcon = s.icon;

  return (
    <div className="relative">
      <Tilt max={8}>
        <PhoneFrame className="w-full">
          <div className="flex h-full flex-col bg-[#f8fafc] text-[#0f172a] text-left pt-6 pb-4 px-3.5 select-none">
            {/* Google Search Bar Mock */}
            <div className="mt-2 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className="font-bold text-[13px] tracking-tight text-blue-600">G</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={s.query}
                  className="truncate text-[11px] font-medium text-slate-700"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {s.query}
                </motion.span>
              </AnimatePresence>
              <Search className="ml-auto size-3 text-slate-400" />
            </div>

            {/* Filter Pills */}
            <div className="mt-2.5 flex gap-1.5 overflow-hidden text-[9px] font-semibold text-slate-500">
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-600 font-bold border border-blue-200">
                All
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5">Maps</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5">Reviews</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5">News</span>
            </div>

            {/* Simulated Result Card (AEO / GEO / Local) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={s.engine}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="mt-3 flex-1 flex flex-col gap-2.5 overflow-hidden"
              >
                {/* AI Overview Box */}
                <div className="rounded-xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-purple-50/40 p-2.5 shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="grid size-4 place-items-center rounded-md bg-blue-600 text-white shadow-xs">
                      <EngineIcon className="size-2.5" />
                    </span>
                    <span className="text-[10px] font-bold text-slate-800">{s.engine}</span>
                    <span className="ml-auto text-[8px] font-bold text-blue-600 bg-blue-100/80 px-1.5 py-0.2 rounded-full">
                      #1 Source
                    </span>
                  </div>
                  <p className="mt-1.5 text-[10px] leading-snug text-slate-700 line-clamp-3">
                    {s.aiText}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 border-t border-slate-100 pt-1.5">
                    <span className="grid size-4 place-items-center rounded-full bg-blue-600 text-white text-[8px]">
                      ✓
                    </span>
                    <span className="truncate text-[9px] font-bold text-slate-900">{s.site}</span>
                    <ExternalLink className="ml-auto size-2.5 text-slate-400" />
                  </div>
                </div>

                {/* Organic Search Result #1 */}
                <div className="rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="grid size-4 place-items-center rounded-full bg-slate-100 text-slate-700 text-[8px]">
                      🏥
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[9px] text-slate-500">{s.site}</p>
                    </div>
                  </div>
                  <h4 className="mt-1 text-[11px] font-bold leading-tight text-blue-700">
                    {s.title}
                  </h4>
                  <p className="mt-1 text-[9px] leading-snug text-slate-600 line-clamp-2">
                    {s.meta}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[8.5px] font-bold text-amber-600">
                    <Star className="size-2.5 fill-amber-500 text-amber-500" />
                    <span>{s.rating}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom SERP Navigation bar */}
            <div className="mt-auto border-t border-slate-200 pt-2 flex items-center justify-between text-[8.5px] text-slate-500 font-medium">
              <span>Google Verified Search Result</span>
              <span className="font-bold text-blue-600">Bangalore</span>
            </div>
          </div>
        </PhoneFrame>
      </Tilt>

      {/* Floating Verification Notification Ping */}
      <div aria-hidden className="absolute inset-x-[-12%] top-[-8%] z-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.ping}
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface/95 p-3 shadow-xl backdrop-blur-xl"
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm font-bold text-[11px]"
              style={{ background: s.pingColor }}
            >
              <TrendingUp className="size-4" />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <span className="flex justify-between text-[11px] text-muted font-medium">
                {s.pingApp} <span>Verified</span>
              </span>
              <span className="block truncate text-[13px] font-bold text-fg">{s.ping}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
