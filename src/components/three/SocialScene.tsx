"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motionAllowed } from "@/lib/motion-pref";

type Kind = "heart" | "play" | "bubble" | "star" | "ring" | "gem" | "ball";
type Item = { kind: Kind; p: [number, number, number]; s: number; c: string };

// Laid out around the edges and the gap beside the phone, clear of the headline.
const full: Item[] = [
  { kind: "heart", p: [5.6, 2.6, -1], s: 0.9, c: "#d62976" },
  { kind: "heart", p: [-7.2, -3.2, -2], s: 0.6, c: "#fa7e1e" },
  { kind: "heart", p: [0.9, -3.2, -1], s: 0.45, c: "#962fbf" },
  { kind: "play", p: [5.6, -2.4, -0.5], s: 0.75, c: "#4f5bd5" },
  { kind: "bubble", p: [-7.6, 3.4, -3], s: 0.6, c: "#ffffff" },
  { kind: "star", p: [1.0, 3.4, -3], s: 0.5, c: "#feda75" },
  { kind: "ring", p: [-7.8, -0.6, -3], s: 0.7, c: "#d62976" },
  { kind: "gem", p: [6.4, 0.2, -3], s: 0.45, c: "#fa7e1e" },
  { kind: "ball", p: [0.8, 0.2, -4], s: 0.35, c: "#962fbf" },
  { kind: "star", p: [-1.2, -3.9, -2], s: 0.4, c: "#fa7e1e" },
];
// Centred page heroes keep only the shapes that hug the edges.
const few = full.filter((it) => Math.abs(it.p[0]) >= 5);

function heartShape() {
  // The classic three.js heart, drawn point-down after the flip below.
  const s = new THREE.Shape();
  s.moveTo(5, 5);
  s.bezierCurveTo(5, 5, 4, 0, 0, 0);
  s.bezierCurveTo(-6, 0, -6, 7, -6, 7);
  s.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
  s.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
  s.bezierCurveTo(16, 7, 16, 0, 10, 0);
  s.bezierCurveTo(7, 0, 5, 5, 5, 5);
  return s;
}

function starShape() {
  const s = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.45 : 1;
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    if (i) s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    else s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  return s;
}

function triangleShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.3, -0.36);
  s.lineTo(0.42, 0);
  s.lineTo(-0.3, 0.36);
  s.closePath();
  return s;
}

function useGeometries() {
  return useMemo(() => {
    const bevel = { bevelEnabled: true, bevelSegments: 8, curveSegments: 24 };
    const heart = new THREE.ExtrudeGeometry(heartShape(), { ...bevel, depth: 4, bevelSize: 1.6, bevelThickness: 1.6 });
    heart.center();
    heart.rotateZ(Math.PI);
    heart.scale(0.055, 0.055, 0.055);
    const star = new THREE.ExtrudeGeometry(starShape(), { ...bevel, depth: 0.25, bevelSize: 0.08, bevelThickness: 0.1 });
    star.center();
    const tri = new THREE.ExtrudeGeometry(triangleShape(), { ...bevel, depth: 0.12, bevelSize: 0.05, bevelThickness: 0.05 });
    tri.center();
    return { heart, star, tri };
  }, []);
}

function Glossy({ color }: { color: string }) {
  return <meshPhysicalMaterial color={color} roughness={0.18} metalness={0.05} clearcoat={1} clearcoatRoughness={0.08} />;
}

function Shape({ item, geo }: { item: Item; geo: ReturnType<typeof useGeometries> }) {
  const { kind, c } = item;
  if (kind === "heart") return <mesh geometry={geo.heart}><Glossy color={c} /></mesh>;
  if (kind === "star") return <mesh geometry={geo.star}><Glossy color={c} /></mesh>;
  if (kind === "ring") return <mesh><torusGeometry args={[0.8, 0.22, 32, 96]} /><Glossy color={c} /></mesh>;
  if (kind === "gem") return <mesh><icosahedronGeometry args={[0.9, 0]} /><Glossy color={c} /></mesh>;
  if (kind === "ball") return <mesh><sphereGeometry args={[0.9, 48, 48]} /><Glossy color={c} /></mesh>;
  if (kind === "play")
    return (
      <group>
        <RoundedBox args={[1.6, 1.2, 0.35]} radius={0.28} smoothness={6}>
          <Glossy color={c} />
        </RoundedBox>
        <mesh geometry={geo.tri} position={[0.04, 0, 0.22]}>
          <Glossy color="#ffffff" />
        </mesh>
      </group>
    );
  // A chat bubble with "typing" dots.
  return (
    <group>
      <RoundedBox args={[1.7, 1.1, 0.35]} radius={0.4} smoothness={6}>
        <Glossy color={c} />
      </RoundedBox>
      {[-0.42, 0, 0.42].map((x, i) => (
        <mesh key={x} position={[x, 0, 0.2]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <Glossy color={["#fa7e1e", "#d62976", "#962fbf"][i]} />
        </mesh>
      ))}
    </group>
  );
}

function Field({ items, pointer }: { items: Item[]; pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const geo = useGeometries();
  const { size } = useThree();
  const aspect = size.width / size.height;
  // On narrow screens the field is mostly off-screen: pin each shape to its edge, smaller, so it peeks in.
  const narrow = aspect < 1;
  const place = (p: Item["p"]): Item["p"] => {
    if (!narrow) return p;
    const halfW = Math.tan((20 * Math.PI) / 180) * (10 - p[2]) * aspect;
    return [Math.sign(p[0]) * halfW * 1.08, p[1], p[2]];
  };

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-dt * 3);
    g.rotation.y += (pointer.current.x * 0.35 - g.rotation.y) * k;
    g.rotation.x += (pointer.current.y * 0.2 + window.scrollY * 0.0004 - g.rotation.x) * k;
    g.position.y += (window.scrollY * 0.003 - g.position.y) * k;
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Float key={i} speed={1.4 + (i % 3) * 0.4} rotationIntensity={1.2} floatIntensity={1.6}>
          <group position={place(it.p)} scale={narrow ? it.s * 0.5 : it.s} rotation={[0.2 * i, -0.4 + 0.3 * i, 0.15 * i]}>
            <Shape item={it} geo={geo} />
          </group>
        </Float>
      ))}
    </group>
  );
}

/**
 * Glossy 3D reactions (hearts, reels, DMs, stars) floating behind a hero.
 * Follows the pointer and the scroll; only renders while on screen.
 */
export default function SocialScene({ density = "full" }: { density?: "full" | "few" }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [animate] = useState(motionAllowed);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] max-h-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={animate && visible ? "always" : "demand"}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 6]} intensity={1.4} />
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 4, 6]} scale={[10, 4, 1]} />
          <Lightformer intensity={2} color="#ffd6e8" position={[-6, 0, 3]} rotation-y={Math.PI / 2} scale={[8, 8, 1]} />
          <Lightformer intensity={2} color="#d9ccff" position={[6, -2, 3]} rotation-y={-Math.PI / 2} scale={[8, 8, 1]} />
        </Environment>
        <Field items={density === "few" ? few : full} pointer={pointer} />
      </Canvas>
    </div>
  );
}
