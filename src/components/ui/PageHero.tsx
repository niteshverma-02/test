import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Aurora } from "@/components/ui/Aurora";
import { Scramble } from "@/components/motion/Scramble";
import { cn } from "@/lib/cn";
import { Scene3D } from "@/components/three/Scene3D";

/** Centered page intro: small coloured eyebrow, big headline, one short line. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-clip pb-16 pt-[calc(var(--nav-h)+5rem)] text-center lg:pb-24 lg:pt-[calc(var(--nav-h)+8rem)]", className)}>
      <Aurora subtle />
      <Scene3D density="few" />
      <div className="container-page relative z-10">
        <p className="eyebrow mark">
          <Scramble text={eyebrow} />
        </p>
        <RevealText as="h1" immediate className="headline mx-auto mt-4 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)]">
          {title}
        </RevealText>
        {sub && (
          <RevealText as="p" immediate delay={0.25} className="mx-auto mt-6 max-w-xl text-[clamp(1.125rem,2vw,1.375rem)] text-muted">
            {sub}
          </RevealText>
        )}
        {children}
      </div>
    </section>
  );
}
