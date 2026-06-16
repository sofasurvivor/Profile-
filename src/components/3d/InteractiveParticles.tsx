"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateInitialData(count: number) {
  const pos = new Float32Array(count * 3);
  const initialPos = new Float32Array(count * 3);
  const vels = new Float32Array(count * 3);
  const randoms = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Position particles in a spherical cloud shell
    const r = 4.0 + Math.random() * 8.0;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = (Math.random() - 0.5) * 15 - 5; // spread in depth

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;

    initialPos[i * 3] = x;
    initialPos[i * 3 + 1] = y;
    initialPos[i * 3 + 2] = z;

    vels[i * 3] = (Math.random() - 0.5) * 0.05;
    vels[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
    vels[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

    randoms[i] = Math.random();
  }

  return [pos, vels, randoms, initialPos] as const;
}

export default function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  // Track scroll and mouse
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);

  // Generate initial particle states (positions, velocities, colors, sizes)
  const [positions, , randomFactors, initialPositions] = useMemo(() => {
    return generateInitialData(count);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth track mouse and scroll
    mouseRef.current.lerp(state.pointer, 0.08);
    if (typeof window !== "undefined") {
      scrollRef.current = THREE.MathUtils.lerp(scrollRef.current, window.scrollY, 0.05);
    }

    if (!pointsRef.current) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const pos = positionsAttr.array as Float32Array;

    // Convert normalized mouse coords to 3D space approximate coords
    const mouse3D = new THREE.Vector3(
      mouseRef.current.x * 6.0,
      mouseRef.current.y * 4.0,
      0
    );

    const scrollFactor = Math.min(scrollRef.current / 1500, 1.0);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Base drift velocities
      const driftX = Math.sin(time * 0.2 + randomFactors[i] * 100) * 0.005;
      const driftY = Math.cos(time * 0.2 + randomFactors[i] * 100) * 0.005;
      
      // Let's morph the target layout based on scroll
      // Scroll = 0: Spherical cloud
      // Scroll = 1: Structured rotating double-helix / data grid
      // Base positions
      const initX = initialPositions[i3];
      const initY = initialPositions[i3 + 1];
      const initZ = initialPositions[i3 + 2];

      // Helix target positions
      const angle = (i / count) * Math.PI * 20 + time * 0.1;
      const radius = 3.0 + Math.sin(angle * 0.5) * 1.5;
      const height = ((i / count) - 0.5) * 12.0;

      const helixX = radius * Math.cos(angle);
      const helixY = height;
      const helixZ = radius * Math.sin(angle);

      // Blend between spherical cloud and helix based on scrollFactor
      const targetX = THREE.MathUtils.lerp(initX, helixX, scrollFactor);
      const targetY = THREE.MathUtils.lerp(initY, helixY, scrollFactor);
      const targetZ = THREE.MathUtils.lerp(initZ, helixZ, scrollFactor);

      // Smoothly blend current positions with target scrolled shape
      let posX = THREE.MathUtils.lerp(pos[i3], targetX + driftX, 0.04);
      let posY = THREE.MathUtils.lerp(pos[i3 + 1], targetY + driftY, 0.04);
      let posZ = THREE.MathUtils.lerp(pos[i3 + 2], targetZ, 0.04);

      // Repulsion force from cursor
      const dx = posX - mouse3D.x;
      const dy = posY - mouse3D.y;
      const dz = posZ - mouse3D.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq < 4.0) {
        const dist = Math.sqrt(distSq);
        const force = (2.0 - dist) * 0.15; // push intensity
        posX += (dx / dist) * force;
        posY += (dy / dist) * force;
        posZ += (dz / dist) * force;
      }

      pos[i3] = posX;
      pos[i3 + 1] = posY;
      pos[i3 + 2] = posZ;
    }

    positionsAttr.needsUpdate = true;

    // Gentle global rotation
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = Math.sin(time * 0.005) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00F0FF" // Cyberpunk Cyan
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
