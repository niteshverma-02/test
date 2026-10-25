"use client";

import { useId, useRef, useState } from "react";
import { loopPath, NODE_H, stages, systemEdges, systemNodes, type EdgeId, type NodeId } from "@/content/process";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

function SystemMap({ stage }: { stage: number }) {
  const grad = `pm-${useId().replace(/:/g, "")}`;
  const s = stages[stage];
  const nodes = new Set<NodeId>(s.nodes);
  const edges = new Set<EdgeId>(s.edges);
  const ghost = s.nodes.length === 0;

  return (
    <svg
      viewBox="0 0 720 490"
      className="h-full w-full"
      role="img"
      aria-label={`System map, step ${stage + 1} of ${stages.length}: ${s.title}.`}
    >
      <defs>
        <linearGradient id={grad} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="720" y2="490">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <style>{`
        .pm-label{font:600 15px var(--font-sans);letter-spacing:-.01em}
        .pm-sub{font:500 11.5px var(--font-sans)}
        .pm-draw{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .9s cubic-bezier(.16,1,.3,1)}
        .pm-draw[data-on="true"]{stroke-dashoffset:0}
        .motion-off .pm-packet{display:none}.motion-off .pm-draw{transition:none}
      `}</style>

      <path d={loopPath} fill="none" stroke="var(--line)" strokeDasharray="3 7" strokeWidth="1.5" />
      <path d={loopPath} pathLength={1} fill="none" stroke={`url(#${grad})`} strokeWidth="2.5" className="pm-draw" data-on={Boolean(s.loop)} />
      {s.loop && (
        <circle r="5" fill="var(--accent)" className="pm-packet">
          <animateMotion dur="7s" repeatCount="indefinite" path={loopPath} />
        </circle>
      )}

      {(Object.keys(systemEdges) as EdgeId[]).map((id) => {
        const on = edges.has(id);
        return (
          <g key={id}>
            <path d={systemEdges[id]} fill="none" stroke="var(--fg)" strokeOpacity="0.14" strokeWidth="1.5" strokeDasharray="4 5" />
            <path d={systemEdges[id]} pathLength={1} fill="none" stroke={`url(#${grad})`} strokeWidth="2.5" strokeLinecap="round" className="pm-draw" data-on={on} />
            {on && (
              <circle r="4.5" fill="var(--accent)" className="pm-packet">
                <animateMotion dur="2.2s" repeatCount="indefinite" path={systemEdges[id]} />
              </circle>
            )}
          </g>
        );
      })}

      {(Object.keys(systemNodes) as NodeId[]).map((id) => {
        const n = systemNodes[id];
        const on = nodes.has(id);
        return (
          <g key={id} style={{ transition: "opacity .6s" }} opacity={on || ghost ? 1 : 0.45}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={NODE_H}
              rx="14"
              fill="var(--bg)"
              stroke={on ? `url(#${grad})` : "var(--line)"}
              strokeWidth={on ? 2.5 : 1.5}
              strokeDasharray={ghost ? "5 5" : undefined}
              style={{ transition: "stroke .6s" }}
            />
            {on && <rect x={n.x + 12} y={n.y + 16} width="6" height="26" rx="3" fill={`url(#${grad})`} />}
            <text x={n.x + (on ? 28 : 16)} y={n.y + 26} className="pm-label" fill="var(--fg)">
              {n.label}
            </text>
            <text x={n.x + (on ? 28 : 16)} y={n.y + 44} className="pm-sub" fill="var(--muted)">
              {n.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Eight steps scroll past while the system map (sticky) lights up the
 * parts each step touches. Without animation only the highlight changes.
 */
export function ProcessMap() {
  const root = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useGSAP(
    () => {
      const steps = root.current?.querySelectorAll<HTMLElement>("[data-step]") ?? [];
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) setStage(i);
          },
        });
      });
    },
    { scope: root },
  );

  const s = stages[stage];

  return (
    <div ref={root} className="grid gap-x-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="sticky top-[var(--nav-h)] z-10 -mx-[var(--gutter)] self-start bg-bg/85 px-gutter pb-3 pt-3 backdrop-blur-xl lg:order-2 lg:top-[calc(var(--nav-h)+2rem)] lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
        <div className="card p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 text-[13px] font-medium text-muted" aria-live="polite">
            <span>
              <span className="mark font-semibold">{String(stage + 1).padStart(2, "0")}</span> / {String(stages.length).padStart(2, "0")} ·{" "}
              <span className="text-fg">{s.title}</span>
            </span>
            <span className="hidden sm:inline">System map</span>
          </div>
          <div className="mt-3 flex gap-1" aria-hidden>
            {stages.map((st, i) => (
              <span
                key={st.id}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  i <= stage ? "ig-gradient" : "bg-line",
                )}
              />
            ))}
          </div>
          <div className="mt-4 aspect-[720/490] max-h-[34svh] w-full lg:max-h-none">
            <SystemMap stage={stage} />
          </div>
        </div>
      </div>

      <ol className="lg:order-1">
        {stages.map((st, i) => (
          <li
            key={st.id}
            data-step
            className={cn(
              "flex min-h-[46svh] origin-left flex-col justify-center py-10 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)] motion-reduce:transition-none lg:min-h-[62svh]",
              i === stage ? "opacity-100" : "scale-[0.94] opacity-25",
            )}
          >
            <span
              className={cn(
                "headline text-[clamp(2.5rem,5vw,4rem)] leading-none",
                i === stage ? "ig-text" : "text-outline",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="headline mt-3 text-[clamp(2.25rem,5vw,4rem)]">{st.title}</h3>
            <p className="mt-3 max-w-sm text-[19px] text-muted">{st.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
