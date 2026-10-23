import type { CSSProperties } from "react";

const emojis = ["❤️", "🔥", "✨", "💬", "😍", "📈", "👏", "💖", "🚀", "⭐", "🙌", "💯", "📸", "🎯"];

// Deterministic spread so server and client render the same thing.
const drops = emojis.map((e, i) => ({
  e,
  style: {
    left: `${(i * 37 + 5) % 96}%`,
    fontSize: `${18 + ((i * 7) % 22)}px`,
    "--delay": `${-((i * 1.9) % 13)}s`,
    "--dur": `${10 + ((i * 3) % 7)}s`,
    "--sway": `${i % 2 ? 40 : -40}px`,
    "--spin": `${i % 3 ? 25 : -25}deg`,
    "--o": i % 3 ? 0.55 : 0.85,
  } as CSSProperties,
}));

/** Reactions drifting up the background, like a live stream. Decorative. */
export function EmojiRain() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <span key={d.e} className="emoji-rise" style={d.style}>
          {d.e}
        </span>
      ))}
    </span>
  );
}
