import { motionAllowed } from "@/lib/motion-pref";

const COLORS = ["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"];

type Options = { x?: number; y?: number; count?: number; spread?: number };

/**
 * A short confetti burst on a throwaway full-screen canvas.
 * No-op for reduced-motion visitors.
 */
export function confetti({ x, y, count = 160, spread = 1.1 }: Options = {}) {
  if (typeof window === "undefined" || !motionAllowed()) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "200" });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const ox = x ?? w / 2;
  const oy = y ?? h * 0.6;
  const parts = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * spread;
    const speed = 7 + Math.random() * 11;
    return {
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 6 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.35,
      round: Math.random() < 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  const life = 2800;
  const start = performance.now();
  const frame = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - life * 0.6) / (life * 0.4));
    for (const p of parts) {
      p.vx *= 0.986;
      p.vy = p.vy * 0.986 + 0.34;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.rot * 2.2));
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5);
      }
      ctx.restore();
    }
    if (t < life) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
