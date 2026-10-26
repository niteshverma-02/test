"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useOnScreen, useWebGL } from "@/components/three/webgl";
import type { EngineKind } from "@/components/three/EngineObject";

const EngineObject = dynamic(() => import("@/components/three/EngineObject"), { ssr: false });

/** A large chrome emblem for server-rendered sections; renders nothing without WebGL. Give it a position (absolute/relative) via className. */
const tints: Record<EngineKind, string> = { SEO: "#ff7a59", AEO: "#7fb7ff", GEO: "#f2c879" };

export function Emblem({ kind, tint = tints[kind], className }: { kind: EngineKind; tint?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const gl = useWebGL();
  const on = useOnScreen(ref);
  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none", className)}>
      <span className="absolute inset-[20%] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      {gl && <EngineObject kind={kind} active tint={tint} render={on} />}
    </div>
  );
}
