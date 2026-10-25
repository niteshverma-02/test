"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { igAccounts } from "@/lib/instagram";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";
import { LiveAccounts } from "./LiveAccounts";

const groups = projects.map((p) => ({ slug: p.slug, name: p.name, accounts: igAccounts(p.links) })).filter((g) => g.accounts.length > 0);

/** The real accounts I manage, live from Instagram, grouped by case study. */
export function LiveWork() {
  const [tab, setTab] = useState(0);
  if (groups.length === 0) return null;
  const total = groups.reduce((n, g) => n + g.accounts.length, 0);

  return (
    <section aria-labelledby="live-title" className="py-20 lg:py-28">
      <div className="container-page">
        <p className="eyebrow mark">Live from Instagram</p>
        <RevealText as="h2" id="live-title" className="headline mt-3 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)]">
          The real feeds I <span className="serif ig-text pr-[0.05em]">run.</span>
        </RevealText>
        <p className="mt-5 max-w-xl text-[17px] text-muted">
          Not mock-ups — {total} live client accounts, straight from Instagram. Scroll their latest posts and reels right here.
        </p>
        <div role="tablist" aria-label="Case study" className="mt-8 flex flex-wrap gap-2">
          {groups.map((g, i) => (
            <button
              key={g.slug}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "h-10 rounded-full px-5 text-[14px] font-semibold transition",
                tab === i ? "ig-gradient text-white shadow-[var(--shadow)]" : "border border-line hover:bg-surface-2",
              )}
            >
              {g.name} <span className="opacity-70">· {g.accounts.length}</span>
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" aria-label={groups[tab].name} className="mt-4">
        {/* Re-keyed so the new group's cards animate in. */}
        <LiveAccounts key={groups[tab].slug} accounts={groups[tab].accounts} />
      </div>
    </section>
  );
}
