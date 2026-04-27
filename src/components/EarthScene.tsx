import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei/core/Float";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { PointMaterial } from "@react-three/drei/core/PointMaterial";
import { Points } from "@react-three/drei/core/Points";
import { Stars } from "@react-three/drei/core/Stars";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { StoryPhase } from "../content/gaiaVerse";

type SceneMode = "intro" | "hero";

interface EarthSceneProps {
  mode: SceneMode;
  timelinePhase?: StoryPhase["id"];
  className?: string;
}

function buildEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#163d7a");
  gradient.addColorStop(0.42, "#0c3a6d");
  gradient.addColorStop(0.7, "#164f79");
  gradient.addColorStop(1, "#061b34");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const landPalettes = [
    ["#42c776", "#237c57"],
    ["#4fdd82", "#1f6f50"],
    ["#86df7d", "#2f8f5c"]
  ];

  const continents = [
    { x: 120, y: 150, rx: 140, ry: 90, rotation: 0.4 },
    { x: 250, y: 290, rx: 90, ry: 140, rotation: -0.18 },
    { x: 465, y: 165, rx: 185, ry: 105, rotation: 0.08 },
    { x: 720, y: 240, rx: 200, ry: 115, rotation: 0.22 },
    { x: 865, y: 360, rx: 110, ry: 70, rotation: -0.28 }
  ];

  continents.forEach((continent, index) => {
    context.save();
    context.translate(continent.x, continent.y);
    context.rotate(continent.rotation);
    const palette = landPalettes[index % landPalettes.length];
    const landGradient = context.createRadialGradient(0, 0, 18, 0, 0, continent.rx);
    landGradient.addColorStop(0, palette[0]);
    landGradient.addColorStop(1, palette[1]);
    context.fillStyle = landGradient;
    context.beginPath();
    context.ellipse(0, 0, continent.rx, continent.ry, 0, 0, Math.PI * 2);
    context.fill();

    context.globalAlpha = 0.28;
    context.fillStyle = "#c8f6ab";
    for (let i = 0; i < 14; i += 1) {
      const px = (Math.random() - 0.5) * continent.rx * 1.45;
      const py = (Math.random() - 0.5) * continent.ry * 1.35;
      const size = 10 + Math.random() * 24;
      context.beginPath();
      context.ellipse(px, py, size, size * 0.48, Math.random(), 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
  });

  context.globalAlpha = 0.22;
  for (let i = 0; i < 180; i += 1) {
    context.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.06})`;
    context.beginPath();
    context.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2.2, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function buildCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 170; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 12 + Math.random() * 42;
    const gradient = context.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, "rgba(255,255,255,0.22)");
    gradient.addColorStop(0.65, "rgba(200,225,255,0.14)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function EarthMesh({ mode, timelinePhase = "past" }: { mode: SceneMode; timelinePhase?: StoryPhase["id"] }) {
  const earthGroup = useRef<THREE.Group>(null);
  const earthTexture = useMemo(() => buildEarthTexture(), []);
  const cloudTexture = useMemo(() => buildCloudTexture(), []);
  const cloudMesh = useRef<THREE.Mesh>(null);
  const atmosphere = useRef<THREE.Mesh>(null);

  const timelineColors = {
    past: { glow: "#52ff9a", atmosphere: "#66c3ff", emissive: "#0f4a39" },
    present: { glow: "#ff9f53", atmosphere: "#4a88ff", emissive: "#4e2413" },
    future: { glow: "#67ffb1", atmosphere: "#7be3ff", emissive: "#1b6d4d" }
  } satisfies Record<StoryPhase["id"], { glow: string; atmosphere: string; emissive: string }>;

  useFrame((state, delta) => {
    if (earthGroup.current) {
      earthGroup.current.rotation.y += delta * (mode === "intro" ? 0.12 : 0.08);
      earthGroup.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }

    if (cloudMesh.current) {
      cloudMesh.current.rotation.y += delta * 0.16;
    }

    if (atmosphere.current) {
      atmosphere.current.scale.setScalar(1.16 + Math.sin(state.clock.elapsedTime * 1.1) * 0.012);
    }
  });

  useEffect(() => {
    return () => {
      earthTexture.dispose();
      cloudTexture.dispose();
    };
  }, [earthTexture, cloudTexture]);

  const colors = timelineColors[timelinePhase];
  const earthScale = mode === "intro" ? 2.28 : 2;

  return (
    <group ref={earthGroup} scale={earthScale}>
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhysicalMaterial
          map={earthTexture}
          metalness={0.08}
          roughness={0.82}
          clearcoat={0.3}
          clearcoatRoughness={0.75}
          emissive={colors.emissive}
          emissiveIntensity={mode === "intro" ? 0.6 : 0.35}
        />
      </mesh>

      <mesh ref={cloudMesh}>
        <sphereGeometry args={[1.028, 96, 96]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.44}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={atmosphere}>
        <sphereGeometry args={[1.1, 96, 96]} />
        <meshBasicMaterial
          color={colors.atmosphere}
          transparent
          opacity={mode === "intro" ? 0.2 : 0.13}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={1.24}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={mode === "intro" ? 0.07 : 0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function DustField() {
  const points = useMemo(() => {
    const data = new Float32Array(900 * 3);

    for (let i = 0; i < 900; i += 1) {
      const stride = i * 3;
      data[stride] = (Math.random() - 0.5) * 18;
      data[stride + 1] = (Math.random() - 0.5) * 11;
      data[stride + 2] = (Math.random() - 0.5) * 12;
    }

    return data;
  }, []);

  return (
    <Points positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#8bd2ff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function SceneContents({ mode, timelinePhase }: { mode: SceneMode; timelinePhase?: StoryPhase["id"] }) {
  return (
    <>
      <color attach="background" args={["#030711"]} />
      <fog attach="fog" args={["#030711", 8, 18]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 3, 5]} intensity={2.1} color="#e8fbff" />
      <pointLight position={[-6, -2, 4]} intensity={22} distance={16} color="#0bf0a3" />
      <pointLight position={[5, 1, -2]} intensity={18} distance={20} color="#3ba7ff" />

      <Stars radius={120} depth={60} count={4000} factor={4} fade speed={0.65} />
      <DustField />

      <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.35}>
        <EarthMesh mode={mode} timelinePhase={timelinePhase} />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        enableRotate={false}
      />
    </>
  );
}

export function EarthScene({ mode, timelinePhase, className }: EarthSceneProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, mode === "intro" ? 5.3 : 6.1], fov: mode === "intro" ? 32 : 38 }}
      >
        <SceneContents mode={mode} timelinePhase={timelinePhase} />
      </Canvas>
    </div>
  );
}
