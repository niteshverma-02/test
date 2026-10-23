import { PageShell } from "@/components/layout/PageShell";
import { ProfileHero } from "@/components/social/ProfileHero";
import { HashtagTicker } from "@/components/social/HashtagTicker";
import { CaseReels } from "@/components/social/CaseReels";
import { LiveWork } from "@/components/social/LiveWork";
import { FeedGrowth } from "@/components/social/FeedGrowth";
import { Toolkit } from "@/components/social/Toolkit";
import { Feed } from "@/components/social/Feed";
import { ScrollStopper } from "@/components/social/ScrollStopper";
import { ProcessCarousel } from "@/components/social/ProcessCarousel";
import { DmCta } from "@/components/social/DmCta";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <PageShell>
      <ProfileHero />
      <HashtagTicker />
      <CaseReels />
      <FeedGrowth />
      <Feed />
      <LiveWork />
      <Toolkit />
      <ScrollStopper />
      <ProcessCarousel />
      <Testimonials />
      <DmCta />
    </PageShell>
  );
}
