import type { Metadata } from "next";
import Link from "next/link";
import { Send, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Aurora } from "@/components/ui/Aurora";
import { Scene3D } from "@/components/three/Scene3D";
import { BrandStories, ExploreGrid } from "@/components/work/ExploreGrid";
import { SeoProofGallery } from "@/components/seo/SeoProofGallery";

export const metadata: Metadata = {
  title: "Work & Proof",
  description: "Healthcare SEO case studies, verified Google Search Console growth, AI Overview results, and client evidence by Leesa Rai.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell>
      <section className="relative overflow-clip pb-16 pt-[calc(var(--nav-h)+3.5rem)] lg:pb-24 lg:pt-[calc(var(--nav-h)+5.5rem)]">
        <Aurora subtle />
        <Scene3D density="few" />
        <div className="container-page relative z-10">
          <div className="text-center">
            <p className="eyebrow mark">Case Studies &amp; Evidence</p>
            <RevealText as="h1" immediate className="headline mx-auto mt-3 max-w-4xl text-[clamp(2.6rem,7.5vw,6rem)]">
              Search results, <span className="serif ig-text pr-[0.06em]">in the wild.</span>
            </RevealText>
            <p className="mx-auto mt-5 max-w-xl text-[clamp(1.0625rem,1.8vw,1.25rem)] text-muted">
              Explore healthcare website audits, doctor keyword rankings, local SEO, Google Business Profiles, and international patient enquiries.
            </p>
          </div>
          <div className="mt-10">
            <p className="mb-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">Client practices &amp; projects</p>
            <BrandStories />
          </div>
          <div className="mt-12 lg:mt-14">
            <ExploreGrid />
          </div>
        </div>
      </section>

      {/* Verified Evidence & Screenshots Showcase */}
      <SeoProofGallery />

      <section className="container-page pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface p-8 text-center sm:px-12 lg:py-16 shadow-[var(--shadow)]">
          <span aria-hidden className="ig-gradient drift absolute -left-20 -top-24 size-80 rounded-full opacity-25 blur-[90px]" />
          <span aria-hidden className="ig-gradient drift absolute -bottom-24 -right-16 size-72 rounded-full opacity-20 blur-[90px] [animation-delay:-6s]" />
          <p className="relative text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">Ready to get discovered?</p>
          <RevealText as="h2" className="headline relative mx-auto mt-3 max-w-3xl text-[clamp(2.2rem,5.5vw,4.25rem)]">
            Let&rsquo;s make your practice <span className="serif ig-text pr-[0.06em]">the next success story.</span>
          </RevealText>
          <p className="relative mx-auto mt-4 max-w-lg text-[16px] text-muted">
            Whether you need a full website SEO audit, Google Business Profile management, or AI search optimization, let&rsquo;s talk.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Magnetic>
              <Link href="/contact" className="ig-gradient shine inline-flex h-12 items-center gap-2 rounded-full px-6 text-[16px] font-semibold text-white transition-transform hover:scale-105 active:scale-95 shadow-md">
                Discuss Your Project <Send aria-hidden className="size-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
