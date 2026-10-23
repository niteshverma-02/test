import { PageShell } from "@/components/layout/PageShell";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <PageShell>
      <section className="relative grid min-h-svh place-items-center overflow-clip px-gutter text-center">
        <Aurora />
        <div className="relative">
          <p className="headline text-outline text-[clamp(6rem,22vw,14rem)] leading-none">404</p>
          <h1 className="headline mt-4 text-[clamp(1.75rem,4vw,2.75rem)]">This page took a wrong turn.</h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Button href="/">Back home</Button>
            <ArrowLink href="/work">See my work</ArrowLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
