"use client";

import Link from "next/link";
import { Phone, Send, Video } from "lucide-react";
import { profile } from "@/content/profile";
import { motion } from "motion/react";
import { RevealText } from "@/components/motion/RevealText";
import { Magnetic } from "@/components/motion/Magnetic";
import { StoryAvatar } from "@/components/mocks/Mocks";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { cn } from "@/lib/cn";
import { EmojiRain } from "./EmojiRain";

const thread = [
  { me: false, text: "Hey Tanu 👋" },
  { me: false, text: "We post every day but our page just isn’t growing…" },
  { me: true, text: "Sounds like it needs a plan, not more posts." },
  { me: true, text: "Let’s fix that together ✨" },
];

/** Closing call to action, styled as a DM thread. */
export function DmCta() {
  return (
    <section aria-labelledby="dm-title" className="container-page pb-24 pt-10 lg:pb-32">
      <div className="relative grid items-center gap-12 overflow-hidden rounded-[36px] bg-ink px-6 py-14 text-[#fdf0f5] sm:px-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20">
        <span aria-hidden className="ig-gradient drift absolute -right-24 -top-24 size-96 rounded-full opacity-40 blur-[100px]" />
        <EmojiRain />
        <div className="relative">
          <p className="eyebrow mark">Let&rsquo;s talk</p>
          <RevealText as="h2" id="dm-title" className="headline mt-4 text-[clamp(2.75rem,6.5vw,5.5rem)]">
            Slide into <span className="serif ig-text pr-[0.06em]">my DMs.</span>
          </RevealText>
          <p className="mt-5 max-w-md text-[17px] text-white/70">
            Building a brand from scratch or fixing one that&rsquo;s gone quiet — tell me where you are, and we&rsquo;ll plan where you&rsquo;re going.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link href="/contact" className="ig-gradient shine inline-flex h-12 items-center gap-2 rounded-full px-6 text-[16px] font-semibold text-white transition-transform hover:scale-105 active:scale-95">
                Start a conversation <Send aria-hidden className="size-4" />
              </Link>
            </Magnetic>
            <span className="text-fg">
              <CopyEmail email={profile.contact.email} />
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] bg-white text-[#1d1d1f] shadow-2xl">
          <div className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
            <StoryAvatar label={profile.identity.initials} className="size-10 text-[12px]" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold">{profile.identity.handle}</p>
              <p className="flex items-center gap-1.5 text-[12px] text-[#86868b]">
                <span className="size-2 rounded-full bg-[#22c55e]" /> Active now
              </p>
            </div>
            <Phone aria-hidden className="size-5" />
            <Video aria-hidden className="size-5" />
          </div>
          {/* The thread plays out message by message when it scrolls into view. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.75, delayChildren: 0.2 }}
            className="flex min-h-[300px] flex-col gap-2 px-4 py-5"
          >
            {thread.map((m) => (
              <motion.p
                key={m.text}
                variants={{ hidden: { opacity: 0, y: 16, scale: 0.6 }, show: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                style={{ transformOrigin: m.me ? "100% 100%" : "0% 100%" }}
                className={cn(
                  "max-w-[80%] rounded-3xl px-4 py-2.5 text-[14px] leading-snug",
                  m.me ? "ig-gradient self-end rounded-br-md text-white" : "self-start rounded-bl-md bg-[#efefef]",
                )}
              >
                {m.text}
              </motion.p>
            ))}
            <motion.span
              aria-hidden
              variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
              style={{ transformOrigin: "0% 100%" }}
              className="flex w-fit items-center gap-1 self-start rounded-3xl rounded-bl-md bg-[#efefef] px-4 py-3.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="typing-dot size-2 rounded-full bg-[#8e8e93]" style={{ animationDelay: `${d * 0.18}s` }} />
              ))}
            </motion.span>
          </motion.div>
          <Link
            href="/contact"
            className="m-3 flex h-12 items-center gap-3 rounded-full border border-black/10 pl-5 pr-2 text-[14px] text-[#86868b] transition-colors hover:border-black/25"
          >
            Message…
            <span className="ig-gradient ml-auto grid size-9 place-items-center rounded-full text-white">
              <Send aria-hidden className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
