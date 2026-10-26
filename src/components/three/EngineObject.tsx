"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { motionAllowed } from "@/lib/motion-pref";

export type EngineKind = "SEO" | "AEO" | "GEO";

/* Liquid chrome that heats towards the engine's colour when its panel is active. */
function useChrome(tint: string) {
  return useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({ color: "#e9e4dc", metalness: 1, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 });
    return { m, base: new THREE.Color("#e9e4dc"), hot: new THREE.Color(tint) };
  }, [tint]);
}

function pinShape() {
  // Map pin: round head tapering to a point, with a hole through the head.
  const s = new THREE.Shape();
  s.moveTo(0, -1.25);
  s.bezierCurveTo(0, -1.25, -0.95, -0.2, -0.95, 0.35);
  s.bezierCurveTo(-0.95, 0.9, -0.52, 1.3, 0, 1.3);
  s.bezierCurveTo(0.52, 1.3, 0.95, 0.9, 0.95, 0.35);
  s.bezierCurveTo(0.95, -0.2, 0, -1.25, 0, -1.25);
  const hole = new THREE.Path();
  hole.absarc(0, 0.38, 0.36, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

function Shape({ kind, active, tint }: { kind: EngineKind; active: boolean; tint: string }) {
  const g = useRef<THREE.Group>(null);
  const dots = useRef<THREE.Mesh[]>([]);
  const { m, base, hot } = useChrome(tint);
  const pin = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(pinShape(), { depth: 0.45, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.1, bevelSegments: 8, curveSegments: 48 });
    geo.center();
    return geo;
  }, []);

  /* eslint-disable react-hooks/immutability -- three.js materials are mutated every frame, outside React rendering. */
  useFrame((state, dt) => {
    const grp = g.current;
    if (!grp) return;
    const t = state.clock.elapsedTime;
    const speed = motionAllowed() ? (active ? 2.4 : 0.45) : 0;
    grp.rotation.y += dt * speed;
    const s = THREE.MathUtils.damp(grp.scale.x, active ? 1.12 : 1, 6, dt);
    grp.scale.setScalar(s);
    m.color.lerp(active ? hot : base, 1 - Math.exp(-dt * 4));
    m.roughness = THREE.MathUtils.damp(m.roughness, active ? 0.28 : 0.12, 4, dt);
    // AEO: the three "typing" dots bounce one after another.
    dots.current.forEach((d, i) => d && (d.position.y = 0.05 + Math.max(0, Math.sin(t * 5 - i * 0.7)) * (active ? 0.18 : 0.08)));
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group ref={g}>
      {kind === "SEO" && (
        <group rotation-z={0.5}>
          <mesh material={m}>
            <torusGeometry args={[0.85, 0.16, 40, 120]} />
          </mesh>
          <mesh>
            <circleGeometry args={[0.72, 64]} />
            <meshPhysicalMaterial color="#f4ece0" roughness={0.05} metalness={0.2} transparent opacity={0.18} />
          </mesh>
          <mesh material={m} position={[0, -1.45, 0]}>
            <capsuleGeometry args={[0.13, 0.95, 12, 32]} />
          </mesh>
        </group>
      )}
      {kind === "AEO" && (
        <group>
          <RoundedBox args={[2.1, 1.35, 0.5]} radius={0.3} smoothness={8} material={m} />
          <mesh material={m} position={[-0.55, -0.82, 0]} rotation-z={0.5}>
            <coneGeometry args={[0.24, 0.5, 32]} />
          </mesh>
          {[-0.5, 0, 0.5].map((x, i) => (
            <mesh
              key={x}
              ref={(el) => {
                if (el) dots.current[i] = el;
              }}
              position={[x, 0.05, 0.3]}
            >
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color="#0a1020" roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}
      {kind === "GEO" && <mesh geometry={pin} material={m} />}
    </group>
  );
}

/** One engine's chrome emblem: magnifier (SEO), answer bubble (AEO) or map pin (GEO). */
export default function EngineObject({ kind, active, tint, render }: { kind: EngineKind; active: boolean; tint: string; render: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 30 }} frameloop={render ? "always" : "demand"} flat className="!absolute inset-0">
      <ambientLight intensity={0.4} />
      <Environment resolution={128}>
        {/* A warm studio: soft walls all round so the chrome never reflects pure black. */}
        <color attach="background" args={["#26314f"]} />
        <Lightformer form="rect" intensity={1.2} color="#f4ece0" position={[0, 0, 9]} scale={[20, 12, 1]} />
        <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer form="ring" color="#ff7a59" intensity={6} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={3} />
        <Lightformer form="rect" color="#7fb7ff" intensity={2} position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[8, 3, 1]} />
      </Environment>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7}>
        <Shape kind={kind} active={active} tint={tint} />
      </Float>
    </Canvas>
  );
}
