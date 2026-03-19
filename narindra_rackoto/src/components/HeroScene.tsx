import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Torus } from "@react-three/drei";
import * as THREE from "three";

// ─── Orbiting Particles ───────────────────────────────────────────────────────
const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#2563eb"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#60a5fa"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.15;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

// ─── DNA / Helix Strand ────────────────────────────────────────────────────────
const HelixStrand = ({ offset = 0 }: { offset?: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const count = 40;

  const positions = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 4 + offset;
      return new THREE.Vector3(Math.cos(t) * 1.2, (i / count) * 6 - 3, Math.sin(t) * 1.2);
    }), [offset]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <group ref={meshRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color={offset === 0 ? "#3b82f6" : "#2563eb"} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
};

// ─── Rotating Wireframe Core ────────────────────────────────────────────────────
const CoreOrb = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.15;
      outerRef.current.rotation.y = t * 0.22;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.z = t * 0.18;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.6;
      ringRef1.current.rotation.y = t * 0.4;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.5;
      ringRef2.current.rotation.z = t * 0.7;
    }
  });

  return (
    <group>
      {/* Outer geodesic shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.14} />
      </mesh>
      {/* Inner core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.1]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Orbital rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 8, 80]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.8, 0.01, 8, 80]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

// ─── Main Scene ─────────────────────────────────────────────────────────────────
const HeroScene = () => {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.15} />
        <Stars radius={80} depth={60} count={1500} factor={3} saturation={0} fade speed={1} />
        <ParticleField />
        <CoreOrb />
        <HelixStrand offset={0} />
        <HelixStrand offset={Math.PI} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
