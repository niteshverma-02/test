import { PageShell } from "@/components/layout/PageShell";
import { ProfileHero } from "@/components/social/ProfileHero";
import { HashtagTicker } from "@/components/social/HashtagTicker";
import { AeoGeoSimulator } from "@/components/seo/AeoGeoSimulator";
import { AeoGeoMatrix } from "@/components/seo/AeoGeoMatrix";
import { SeoProofGallery } from "@/components/seo/SeoProofGallery";
import { CaseReels } from "@/components/social/CaseReels";
import { Toolkit } from "@/components/social/Toolkit";
import { ScrollStopper } from "@/components/social/ScrollStopper";
import { ProcessCarousel } from "@/components/social/ProcessCarousel";
import { DmCta } from "@/components/social/DmCta";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <PageShell>
      <ProfileHero />
      <HashtagTicker />

      {/* Interactive Live Search & AI Engine Simulator */}
      <section className="container-page py-12 lg:py-16">
        <div className="mb-8 text-center sm:text-left">
          <p className="eyebrow mark">Interactive Engine</p>
          <h2 className="headline mt-2 text-[clamp(2rem,4vw,3.2rem)]">
            How clients rank across <span className="serif ig-text pr-[0.06em]">Search &amp; AI.</span>
          </h2>
          <p className="mt-3 max-w-xl text-[16px] text-muted">
            Test the live simulator below to see how structured medical data powers Google AI Overviews, LLM citations, and Local 3-Pack discovery.
          </p>
        </div>
        <AeoGeoSimulator />
      </section>

      {/* The Tri-Engine Methodology: SEO, AEO & GEO */}
      <AeoGeoMatrix />

      {/* Real Verified Proof & Screenshots Gallery */}
      <SeoProofGallery />

      {/* Case Studies */}
      <CaseReels />

      {/* 6-Stage Healthcare SEO Process */}
      <ProcessCarousel />

      {/* Tools & Analytics Stack */}
      <Toolkit />

      {/* Impact marquee */}
      <ScrollStopper />

      {/* Testimonials (if populated) */}
      <Testimonials />

      {/* Closing Call to Action */}
      <DmCta />
    </PageShell>
  );
}
