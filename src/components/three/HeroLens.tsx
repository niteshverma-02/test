"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, Text } from "@react-three/drei";
import { Suspense, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useMode } from "@/lib/theme";
import { motionAllowed } from "@/lib/motion-pref";
import { cssVar } from "./webgl";

const FONT = "/fonts/geist-600.woff";
export const heroWords = ["Searched.", "Answered.", "Found."];

const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 4);

/** The three poster lines, set in WebGL so the glass lens can refract them. */
function Lines({ fg, ember, onSynced }: { fg: string; ember: string; onSynced: () => void }) {
  const { viewport, size } = useThree();
  const refs = useRef<(THREE.Mesh & { fillOpacity: number; outlineOpacity: number })[]>([]);
  const narrow = size.width < 640;
  const fs = viewport.width * (narrow ? 0.165 : 0.13);
  const row = viewport.height / 3;
  const x = -viewport.width / 2;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = Math.min(1, window.scrollY / window.innerHeight);
    refs.current.forEach((m, i) => {
      if (!m) return;
      // Entrance: each line rises out of its row; on scroll the lines drift apart.
      const k = motionAllowed() ? easeOut((t - 0.15 - i * 0.14) / 1.1) : 1;
      m.position.y = row * (1 - i) - (1 - k) * row * 0.7 + scroll * row * (1 - i) * 0.35;
      m.position.x = x + scroll * (i - 1) * viewport.width * 0.08;
      if (i === 2) {
        m.fillOpacity = 0;
        m.outlineOpacity = k;
      } else m.fillOpacity = k;
    });
  });

  return (
    <>
      {heroWords.map((w, i) => (
        <Text
          key={w}
          ref={(m) => {
            refs.current[i] = m as never;
          }}
          font={FONT}
          fontSize={fs}
          anchorX="left"
          anchorY="middle"
          letterSpacing={-0.055}
          onSync={onSynced}
          position={[x, row * (1 - i), 0]}
          color={i === 1 ? ember : fg}
          {...(i === 2 ? { fillOpacity: 0, outlineWidth: fs * 0.014, outlineColor: fg } : {})}
        >
          {w}
          {/* Transparent so the hollow line and the fade-in opacity actually apply. */}
          <meshBasicMaterial transparent toneMapped={false} />
        </Text>
      ))}
    </>
  );
}

const chrome = <meshStandardMaterial color="#e6e1d8" metalness={1} roughness={0.14} />;

/**
 * A magnifying glass: a real refracting lens (with chromatic aberration) in a
 * chrome ring. It follows the pointer, wanders on its own when idle, and tilts with speed.
 */
function Lens({ ember, bg }: { ember: string; bg: THREE.Color }) {
  const g = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const r = Math.min(viewport.width, viewport.height) * (size.width < 640 ? 0.24 : 0.2);
  const last = useRef({ x: 0, y: 0, t: -10 });
  const v = useRef(new THREE.Vector2());

  useFrame((state, dt) => {
    const grp = g.current;
    if (!grp) return;
    const t = state.clock.elapsedTime;
    const p = state.pointer;
    if (p.x !== last.current.x || p.y !== last.current.y) last.current = { x: p.x, y: p.y, t };
    const idle = !motionAllowed() || t - last.current.t > 2.2;
    const tx = idle ? Math.sin(t * 0.38) * viewport.width * 0.3 : (p.x * viewport.width) / 2;
    const ty = idle ? Math.sin(t * 0.76) * viewport.height * 0.18 : (p.y * viewport.height) / 2;
    const k = 1 - Math.exp(-dt * 4.5);
    const nx = THREE.MathUtils.lerp(grp.position.x, tx, k);
    const ny = THREE.MathUtils.lerp(grp.position.y, ty, k);
    v.current.set((nx - grp.position.x) / Math.max(dt, 1e-3), (ny - grp.position.y) / Math.max(dt, 1e-3));
    grp.position.set(nx, ny, 0.8);
    // Tilt into the direction of travel, like a hand moving a glass.
    grp.rotation.y = THREE.MathUtils.lerp(grp.rotation.y, THREE.MathUtils.clamp(v.current.x * 0.06, -0.6, 0.6), k);
    grp.rotation.x = THREE.MathUtils.lerp(grp.rotation.x, THREE.MathUtils.clamp(-v.current.y * 0.06, -0.6, 0.6), k);
    const intro = motionAllowed() ? easeOut((t - 0.7) / 1.2) : 1;
    grp.scale.setScalar(intro);
  });

  return (
    <group ref={g} scale={0}>
      <mesh scale={[r, r, r * 0.3]}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshTransmissionMaterial
          samples={size.width < 640 ? 4 : 8}
          resolution={size.width < 640 ? 512 : 1024}
          transmission={1}
          thickness={0.55}
          roughness={0}
          ior={1.38}
          chromaticAberration={0.05}
          anisotropicBlur={0.02}
          distortion={0.04}
          distortionScale={0.2}
          temporalDistortion={0.02}
          background={bg}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[r * 1.02, r * 0.075, 48, 160]} />
        {chrome}
      </mesh>
      <group rotation-z={Math.PI / 4.2}>
        <mesh position={[0, -r * 1.55, 0]}>
          <cylinderGeometry args={[r * 0.08, r * 0.1, r * 0.95, 40]} />
          {chrome}
        </mesh>
        <mesh position={[0, -r * 2.25, 0]}>
          <capsuleGeometry args={[r * 0.13, r * 0.6, 12, 40]} />
          <meshStandardMaterial color={ember} roughness={0.35} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ onReady }: { onReady: () => void }) {
  const mode = useMode();
  const colors = useMemo(
    () => ({ bg: cssVar("--bg", "#0a1020"), fg: cssVar("--fg", "#f5f1ea"), ember: cssVar("--ember", "#ff7a59") }),
    // Re-read the palette whenever the colour mode flips.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="ring" color={colors.ember} intensity={8} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={5} />
          <Lightformer intensity={3} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
        </group>
      </Environment>
      <Suspense fallback={null}>
        <Lines fg={colors.fg} ember={colors.ember} onSynced={onReady} />
        <Lens ember={colors.ember} bg={new THREE.Color(colors.bg)} />
      </Suspense>
    </>
  );
}

/** Full-bleed canvas for the hero headline block. Pointer events come from the whole hero section. */
export default function HeroLens({ eventSource, active, onReady }: { eventSource: RefObject<HTMLElement | null>; active: boolean; onReady: () => void }) {
  return (
    <Canvas
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 30 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "demand"}
      flat
      className="!absolute inset-0"
    >
      <Scene onReady={onReady} />
    </Canvas>
  );
}
