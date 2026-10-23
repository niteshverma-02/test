import type { Metadata } from "next";
import Link from "next/link";
import { Send } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Aurora } from "@/components/ui/Aurora";
import { Scene3D } from "@/components/three/Scene3D";
import { BrandStories, ExploreGrid } from "@/components/work/ExploreGrid";
import { LiveWork } from "@/components/social/LiveWork";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects across healthcare branding, e-commerce, and digital marketing content.",
  alternates: { canonical: "/work" },
};

/** Work as an Instagram Explore page, followed by the live client feeds. */
export default function WorkPage() {
  return (
    <PageShell>
      <section className="relative overflow-clip pb-16 pt-[calc(var(--nav-h)+3.5rem)] lg:pb-24 lg:pt-[calc(var(--nav-h)+5.5rem)]">
        <Aurora subtle />
        <Scene3D density="few" />
        <div className="container-page relative z-10">
          <div className="text-center">
            <p className="eyebrow mark">Explore</p>
            <RevealText as="h1" immediate className="headline mx-auto mt-3 max-w-4xl text-[clamp(2.6rem,7.5vw,6rem)]">
              The work, <span className="serif ig-text pr-[0.06em]">in the wild.</span>
            </RevealText>
            <p className="mx-auto mt-5 max-w-xl text-[clamp(1.0625rem,1.8vw,1.25rem)] text-muted">
              Case studies and the real accounts behind them — doctors, lifestyle brands and creators. Search it like Explore.
            </p>
          </div>
          <div className="mt-10">
            <p className="mb-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">Brands in my feed</p>
            <BrandStories />
          </div>
          <div className="mt-12 lg:mt-14">
            <ExploreGrid />
          </div>
        </div>
      </section>

      <LiveWork />

      <section className="container-page pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-12 text-center text-[#fdf0f5] sm:px-12 lg:py-16">
          <span aria-hidden className="ig-gradient drift absolute -left-20 -top-24 size-80 rounded-full opacity-40 blur-[90px]" />
          <span aria-hidden className="ig-gradient drift absolute -bottom-24 -right-16 size-72 rounded-full opacity-30 blur-[90px] [animation-delay:-6s]" />
          <p className="relative text-[13px] font-semibold uppercase tracking-[0.16em] text-white/60">Your brand, next?</p>
          <RevealText as="h2" className="headline relative mx-auto mt-3 max-w-3xl text-[clamp(2.2rem,5.5vw,4.25rem)]">
            Let&rsquo;s make your feed <span className="serif ig-text pr-[0.06em]">the next case study.</span>
          </RevealText>
          <div className="relative mt-8 flex justify-center">
            <Magnetic>
              <Link href="/contact" className="ig-gradient shine inline-flex h-12 items-center gap-2 rounded-full px-6 text-[16px] font-semibold text-white transition-transform hover:scale-105">
                Send me a DM <Send aria-hidden className="size-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
