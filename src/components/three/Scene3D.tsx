"use client";

import dynamic from "next/dynamic";

// three.js is client-only and heavy: load it after the page, never on the server.
const SocialScene = dynamic(() => import("./SocialScene"), { ssr: false });

export function Scene3D({ density }: { density?: "full" | "few" }) {
  return <SocialScene density={density} />;
}
