import Link from "next/link";
import { navigation } from "@/content/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Btn } from "@/components/report/ui";

/** 404 as an empty results page: "did not match any documents", then suggestions. */
export default function NotFound() {
  return (
    <PageShell>
      <section className="container-page flex min-h-svh flex-col justify-center pb-16 pt-[calc(var(--nav-h)+3rem)]">
        <p className="label text-[10px] text-muted">Status 404 · Not indexed</p>
        <h1 className="poster mt-6 text-[clamp(3.5rem,13vw,12rem)]">
          No <span className="grad-text">results.</span>
        </h1>
        <div className="mt-10 grid gap-10 border-t border-line pt-8 lg:grid-cols-2">
          <div>
            <p className="text-[18px]">Your search did not match any pages on this site.</p>
            <p className="label mt-6 text-[10px] text-muted">Suggestions</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] text-muted">
              <li>Check the address for typos.</li>
              <li>Try one of the pages that do rank:</li>
            </ul>
          </div>
          <ol className="border-t border-line">
            {navigation.map((n, i) => (
              <li key={n.href} className="border-b border-line">
                <Link href={n.href} className="flex items-baseline gap-4 py-3 hover:text-ember">
                  <span className="font-mono text-[11px] text-muted">#{i + 1}</span>
                  <span className="poster text-[1.8rem]">{n.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10">
          <Btn href="/">Back to the index</Btn>
        </div>
      </section>
    </PageShell>
  );
}
