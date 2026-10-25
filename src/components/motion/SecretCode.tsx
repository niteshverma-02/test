"use client";

import { useEffect } from "react";
import { confetti } from "@/lib/confetti";
import { toast } from "@/lib/toast";

const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** The Konami code (↑↑↓↓←→←→BA) sets off confetti. */
export function SecretCode() {
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === CODE[pos] ? pos + 1 : key === CODE[0] ? 1 : 0;
      if (pos < CODE.length) return;
      pos = 0;
      confetti({ y: window.innerHeight * 0.7, count: 220 });
      setTimeout(() => confetti({ x: window.innerWidth * 0.2, y: window.innerHeight * 0.8, count: 90 }), 250);
      setTimeout(() => confetti({ x: window.innerWidth * 0.8, y: window.innerHeight * 0.8, count: 90 }), 450);
      toast("You found the secret. You're hired… I mean, I am?");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
