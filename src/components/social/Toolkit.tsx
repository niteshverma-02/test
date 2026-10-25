"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  CalendarClock,
  CalendarDays,
  LayoutDashboard,
  Megaphone,
  Palette,
  PenLine,
  Play,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useState, type ComponentType, type SVGProps } from "react";
import { PhoneFrame } from "@/components/mocks/Mocks";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";

type App = {
  name: string;
  Icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>> | null;
  letter?: string;
  bg: string;
  fg?: string;
  use: string;
  badge?: boolean;
};

/* The platforms and tools from the SEO skills list, as apps. */
const apps: App[] = [
  {
    name: "Search Console",
    Icon: BarChart3,
    bg: "linear-gradient(135deg,#2563eb,#3b82f6)",
    use: "Tracking organic clicks, query rankings, impressions, and indexation health.",
    badge: true,
  },
  {
    name: "Business Profile",
    Icon: LayoutDashboard,
    bg: "linear-gradient(135deg,#10b981,#059669)",
    use: "Google Maps local pack management, reviews, and clinical practice discoverability.",
    badge: true,
  },
  {
    name: "Ahrefs / SEMrush",
    Icon: Megaphone,
    bg: "#ff5a00",
    use: "Competitive keyword research, content gap audits, and backlink analysis.",
  },
  {
    name: "AI Overviews",
    Icon: Sparkles,
    bg: "linear-gradient(135deg,#8b5cf6,#6366f1)",
    use: "Structuring content and medical FAQ schema to capture zero-click AI summaries.",
  },
  {
    name: "ChatGPT & Gemini",
    Icon: Play,
    bg: "#10a37f",
    use: "Generative Engine Optimization (GEO) ensuring LLMs cite the doctor as primary expert.",
  },
  {
    name: "Reddit & Quora",
    Icon: Send,
    bg: "#ff4500",
    use: "Value-led medical community contributions that drive high-intent patient enquiries.",
  },
  {
    name: "Analytics (GA4)",
    Icon: BarChart3,
    bg: "linear-gradient(135deg,#f9ab00,#e37400)",
    use: "Measuring organic traffic growth, patient booking conversions, and bounce rates.",
  },
  {
    name: "Schema Markup",
    Icon: CalendarClock,
    bg: "#0284c7",
    use: "Physician, MedicalClinic, and FAQPage JSON-LD schema for rich search results.",
  },
];
const dock: App[] = [
  {
    name: "Audits",
    Icon: Palette,
    bg: "linear-gradient(135deg,#00c4cc,#7d2ae8)",
    use: "UI/UX, page architecture, and crawlability diagnostics.",
  },
  {
    name: "Strategy",
    Icon: CalendarDays,
    bg: "#fff",
    fg: "#2563eb",
    use: "Patient search intent roadmaps and editorial treatment calendars.",
  },
  {
    name: "Content",
    Icon: PenLine,
    bg: "linear-gradient(180deg,#ffd60a,#ffb800)",
    fg: "#0f172a",
    use: "E-E-A-T medically sound blog posts, symptom guides, and clinical FAQs.",
  },
  {
    name: "Outreach",
    Icon: Send,
    bg: "linear-gradient(135deg,#0099ff,#a033ff)",
    use: "Ethical backlink building, medical directory citations, and digital PR.",
  },
];
const all = [...apps, ...dock];

function AppIcon({ app, size }: { app: App; size: string }) {
  const { Icon } = app;
  return (
    <span
      className={cn(
        "relative grid place-items-center rounded-[22%] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.45)]",
        size,
      )}
      style={{ background: app.bg, color: app.fg ?? "#fff" }}
    >
      {Icon ? (
        <Icon aria-hidden className="size-[52%]" />
      ) : (
        <span className="font-display text-[1.6em] font-bold leading-none">
          {app.letter}
        </span>
      )}
    </span>
  );
}

/** My toolkit as a phone home screen: tap an app to see what I use it for. Icons jiggle like edit mode on hover. */
export function Toolkit() {
  const [pick, setPick] = useState(all[0]);
  const [editing, setEditing] = useState(false);

  const tile = (app: App, label = true) => (
    <button
      key={app.name + (label ? "" : "-dock")}
      type="button"
      onClick={() => setPick(app)}
      aria-pressed={pick.name === app.name}
      aria-label={`${app.name}: what I use it for`}
      className="group flex flex-col items-center gap-[1.6cqw]"
    >
      <span
        className={cn(
          "relative transition-transform duration-300 group-active:scale-90",
          editing && "jiggle",
          pick.name === app.name && "scale-110",
        )}
        style={{ animationDelay: `${(app.name.length % 5) * -0.07}s` }}
      >
        <AppIcon app={app} size="size-[15cqw] text-[5cqw]" />
        {app.badge && (
          <span className="absolute -right-[1.2cqw] -top-[1.2cqw] size-[4.4cqw] rounded-full border-[0.6cqw] border-white bg-[#ff3b30]" />
        )}
        {pick.name === app.name && (
          <motion.span
            layoutId="toolkit-pick"
            className="absolute -inset-[1.6cqw] rounded-[28%] border-[0.7cqw] border-white/90"
          />
        )}
      </span>
      {label && (
        <span className="w-full truncate text-center text-[3cqw] font-medium text-white drop-shadow">
          {app.name}
        </span>
      )}
    </button>
  );

  return (
    <section
      aria-labelledby="toolkit-title"
      className="container-page py-20 lg:py-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="min-w-0 text-center lg:text-left">
          <p className="eyebrow mark">My toolkit</p>
          <RevealText
            as="h2"
            id="toolkit-title"
            className="headline mt-3 text-[clamp(2.4rem,5.5vw,4.5rem)]"
          >
            Everything I use,{" "}
            <span className="serif ig-text pr-[0.06em]">
              on my home screen.
            </span>
          </RevealText>
          <p className="mx-auto mt-5 max-w-lg text-[17px] text-muted lg:mx-0">
            Tap an app on the phone to see what it does in my workflow.
          </p>

          <div className="mx-auto mt-10 max-w-lg lg:mx-0" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={pick.name}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="flex items-start gap-5 rounded-[28px] border border-line bg-surface p-6 text-left shadow-[var(--shadow)] sm:p-7"
              >
                <span className="shrink-0 text-[16px] sm:text-[18px]">
                  <AppIcon
                    app={pick}
                    size="size-16 sm:size-[4.5rem] text-[1.6rem]"
                  />
                </span>
                <span className="min-w-0">
                  <span className="headline block text-[1.6rem] sm:text-[1.9rem]">
                    {pick.name}
                  </span>
                  <span className="mt-1.5 block text-[16px] leading-snug text-muted">
                    {pick.use}
                  </span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          className="relative mx-auto w-[min(300px,78vw)]"
          onPointerEnter={() => setEditing(true)}
          onPointerLeave={() => setEditing(false)}
        >
          <span
            aria-hidden
            className="ig-gradient absolute inset-[-12%] rounded-full opacity-30 blur-3xl"
          />
          <PhoneFrame className="relative w-full">
            <div className="h-full [container-type:inline-size]">
              <div
                className="relative flex h-full flex-col px-[6cqw] pt-[14cqw]"
                style={{
                  background:
                    "linear-gradient(165deg,#feda75 0%,#fa7e1e 22%,#d62976 52%,#962fbf 78%,#4f5bd5 100%)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.35),transparent_55%)]"
                />
                {/* Widget: the week at a glance. Decorative. */}
                <div
                  aria-hidden
                  className="relative rounded-[6cqw] bg-white/20 p-[4cqw] text-white backdrop-blur-md"
                >
                  <p className="text-[3cqw] font-semibold uppercase tracking-wider opacity-80">
                    Content calendar
                  </p>
                  <p className="mt-[1cqw] text-[5.2cqw] font-bold leading-tight">
                    This week&rsquo;s plan
                  </p>
                  <div className="mt-[3cqw] grid grid-cols-7 gap-[1.5cqw] text-center text-[2.8cqw] font-semibold">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span
                        key={i}
                        className="flex flex-col items-center gap-[1cqw]"
                      >
                        {d}
                        <span
                          className={cn(
                            "size-[2cqw] rounded-full",
                            [0, 2, 4, 5].includes(i)
                              ? "bg-white"
                              : "bg-white/30",
                          )}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative mt-[6cqw] grid grid-cols-4 gap-x-[4cqw] gap-y-[5cqw]">
                  {apps.map((a) => tile(a))}
                </div>
                <div className="relative mb-[4cqw] mt-auto grid grid-cols-4 gap-[4cqw] rounded-[7cqw] bg-white/25 p-[3.5cqw] backdrop-blur-md">
                  {dock.map((a) => tile(a, false))}
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
