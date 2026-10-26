import { services } from "@/content/services";

/**
 * Services as a numbered index. Each row is a native <details>, so it opens
 * with the keyboard and without JS; CSS animates the panel height.
 */
export function ServiceIndex({ openFirst = false }: { openFirst?: boolean }) {
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.title} className="rise border-b border-line">
          <details name="services" open={openFirst && i === 0} className="acc group">
            <summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 transition-colors hover:text-ember sm:grid-cols-[4rem_1fr_auto] lg:grid-cols-[4rem_1fr_14rem_auto] [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[13px]">{String(i + 1).padStart(2, "0")}</span>
              <span className="poster text-[clamp(1.5rem,3vw,2.6rem)]">{s.title}</span>
              <span className="label hidden text-[10px] text-muted lg:block">{s.short}</span>
              <span aria-hidden className="relative grid size-10 place-items-center rounded-full border border-line">
                <span className="h-px w-4 bg-current" />
                <span className="absolute h-4 w-px bg-current transition-transform duration-500 group-open:rotate-90 group-open:scale-y-0" />
              </span>
            </summary>
            <div className="grid gap-8 pb-10 pl-[calc(3rem+1rem)] sm:pl-[calc(4rem+1rem)] lg:grid-cols-[1fr_1fr]">
              <p className="max-w-lg text-[16px] text-muted">{s.description}</p>
              <ul className="grid gap-2">
                {s.items.map((it, k) => (
                  <li key={it} className="flex gap-3 border-b border-line pb-2 text-[14px]">
                    <span className="font-mono text-[11px] text-ember">{String.fromCharCode(97 + k)}.</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
