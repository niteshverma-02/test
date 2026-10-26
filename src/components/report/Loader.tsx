import { profile } from "@/content/profile";

const queries = ["orthopaedic surgeon near me", "best knee replacement doctor?", "dentist open now", "is DAA hip surgery safe?", "skin clinic bangalore", `${profile.identity.name.toLowerCase()} seo`];

/**
 * First-visit intro (once per session), pure CSS so nothing can interrupt it:
 * a crawl counter runs to 100 while patient queries roll past, then the two
 * halves of the screen part. The pre-paint script in layout.tsx adds and
 * removes <html class="loading"> on a timer.
 */
export function Loader() {
  return (
    <div aria-hidden className="loader fixed inset-0 z-[120]">
      <div className="loader-half loader-top absolute inset-x-0 top-0 h-1/2 bg-[#0a1020]" />
      <div className="loader-half loader-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#0a1020]" />
      <div className="loader-fade relative flex h-full flex-col justify-between p-[var(--gutter)] text-[#f5f1ea]">
        <div className="label flex justify-between text-[10px] text-[#a9b1c6]">
          <span>{profile.identity.name} — visibility report</span>
          <span className="flex items-center gap-2">
            <span className="blink size-1.5 rounded-full bg-[#ff7a59]" /> Crawling
          </span>
        </div>
        <div>
          <div className="label flex items-center gap-2 text-[11px] text-[#a9b1c6]">
            Indexing query <span className="text-[#ff7a59]">→</span>
            <span className="relative block h-[1.4em] overflow-hidden">
              <span className="loader-roll block">
                {queries.map((q) => (
                  <span key={q} className="block h-[1.4em] leading-[1.4em]">
                    {q}
                  </span>
                ))}
              </span>
            </span>
          </div>
          <p className="poster mt-4 text-[clamp(6rem,24vw,20rem)] leading-[0.8] tabular-nums">
            <span className="loader-count" />
            <span className="text-[#ff7a59]">%</span>
          </p>
          <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <span className="loader-bar block h-full origin-left rounded-full bg-gradient-to-r from-[#ff7a59] via-[#f2c879] to-[#7fb7ff]" />
          </div>
        </div>
      </div>
    </div>
  );
}
