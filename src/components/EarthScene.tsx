import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei/core/Float";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { PointMaterial } from "@react-three/drei/core/PointMaterial";
import { Points } from "@react-three/drei/core/Points";
import { Stars } from "@react-three/drei/core/Stars";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { StoryPhase } from "../content/gaiaVerse";

type SceneMode = "intro" | "hero" | "explore";

interface EarthSceneProps {
  mode: SceneMode;
  timelinePhase?: StoryPhase["id"];
  className?: string;
}

function EarthMesh({ mode, timelinePhase = "past" }: { mode: SceneMode; timelinePhase?: StoryPhase["id"] }) {
  const earthGroup = useRef<THREE.Group>(null);
  const cloudMesh = useRef<THREE.Mesh>(null);
  const atmosphere = useRef<THREE.Mesh>(null);
  const glowShell = useRef<THREE.Mesh>(null);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const [earthTexture, earthNormalMap, earthSpecularMap, earthLightsMap, earthCloudMap] = useMemo(() => {
    const earth = textureLoader.load("/textures/planets/earth_atmos_2048.jpg");
    earth.colorSpace = THREE.SRGBColorSpace;
    earth.anisotropy = 8;

    const normal = textureLoader.load("/textures/planets/earth_normal_2048.jpg");
    normal.anisotropy = 8;

    const specular = textureLoader.load("/textures/planets/earth_specular_2048.jpg");
    specular.anisotropy = 8;

    const lights = textureLoader.load("/textures/planets/earth_lights_2048.png");
    lights.colorSpace = THREE.SRGBColorSpace;
    lights.anisotropy = 8;

    const clouds = textureLoader.load("/textures/planets/earth_clouds_1024.png");
    clouds.colorSpace = THREE.SRGBColorSpace;
    clouds.anisotropy = 8;

    return [earth, normal, specular, lights, clouds];
  }, [textureLoader]);

  const timelineColors = {
    past: { glow: "#52ff9a", atmosphere: "#66c3ff", emissive: "#ffe7aa", cloudOpacity: 0.88 },
    present: { glow: "#ff9f53", atmosphere: "#4a88ff", emissive: "#ffd39a", cloudOpacity: 0.84 },
    future: { glow: "#67ffb1", atmosphere: "#7be3ff", emissive: "#fff0ba", cloudOpacity: 0.9 }
  } satisfies Record<StoryPhase["id"], { glow: string; atmosphere: string; emissive: string; cloudOpacity: number }>;

  useFrame((state, delta) => {
    if (earthGroup.current) {
      const autoRotateSpeed = mode === "explore" ? 0.015 : mode === "intro" ? 0.11 : 0.08;
      earthGroup.current.rotation.y += delta * autoRotateSpeed;
      earthGroup.current.rotation.z = -0.34 + Math.sin(state.clock.elapsedTime * 0.12) * 0.02;
      earthGroup.current.rotation.x = -0.12 + Math.sin(state.clock.elapsedTime * 0.18) * 0.025;
    }

    if (cloudMesh.current) {
      cloudMesh.current.rotation.y += delta * 0.13;
    }

    if (atmosphere.current) {
      atmosphere.current.scale.setScalar(1.16 + Math.sin(state.clock.elapsedTime * 1.1) * 0.012);
    }

    if (glowShell.current) {
      glowShell.current.scale.setScalar(1.18 + Math.sin(state.clock.elapsedTime * 1.4) * 0.018);
    }
  });

  useEffect(() => {
    return () => {
      earthTexture.dispose();
      earthNormalMap.dispose();
      earthSpecularMap.dispose();
      earthLightsMap.dispose();
      earthCloudMap.dispose();
    };
  }, [earthCloudMap, earthLightsMap, earthNormalMap, earthSpecularMap, earthTexture]);

  const colors = timelineColors[timelinePhase];
  const earthScale = mode === "intro" ? 2.2 : mode === "explore" ? 2.15 : 1.95;

  return (
    <group ref={earthGroup} scale={earthScale} rotation={[0, 0, -0.34]}>
      <mesh ref={glowShell} scale={1.16}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={mode === "intro" ? 0.07 : 0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          specularMap={earthSpecularMap}
          specular={new THREE.Color("#3f6d8e")}
          shininess={mode === "intro" ? 18 : 15}
          emissiveMap={earthLightsMap}
          emissive={new THREE.Color(colors.emissive)}
          emissiveIntensity={timelinePhase === "present" ? 0.72 : 0.48}
        />
      </mesh>

      <mesh ref={cloudMesh} scale={1.012}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshPhongMaterial
          map={earthCloudMap}
          transparent
          opacity={colors.cloudOpacity}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      <mesh ref={atmosphere} scale={1.09}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshBasicMaterial
          color={colors.atmosphere}
          transparent
          opacity={mode === "intro" ? 0.18 : 0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={1.02}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshBasicMaterial
          color="#d8ecff"
          transparent
          opacity={0.025}
          depthWrite={false}
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
      <ambientLight intensity={0.3} color="#9abfff" />
      <directionalLight position={[5, 2.5, 5]} intensity={2.8} color="#f5fbff" />
      <directionalLight position={[-8, -1.5, -6]} intensity={0.35} color="#4f79c8" />
      <pointLight position={[-6, -2, 4]} intensity={16} distance={16} color="#0bf0a3" />
      <pointLight position={[5, 1, -2]} intensity={12} distance={20} color="#3ba7ff" />

      <Stars radius={120} depth={60} count={4000} factor={4} fade speed={0.65} />
      <DustField />

      <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.35}>
        <EarthMesh mode={mode} timelinePhase={timelinePhase} />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={mode === "explore"}
        autoRotate={false}
        enableRotate
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.68}
        minDistance={mode === "explore" ? 3.2 : 5.1}
        maxDistance={mode === "explore" ? 8.5 : 6.8}
      />
    </>
  );
}

export function EarthScene({ mode, timelinePhase, className }: EarthSceneProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{
          position: [0, 0, mode === "intro" ? 5.3 : mode === "explore" ? 5.1 : 6.1],
          fov: mode === "intro" ? 32 : mode === "explore" ? 30 : 38
        }}
      >
        <SceneContents mode={mode} timelinePhase={timelinePhase} />
      </Canvas>
    </div>
  );
}
