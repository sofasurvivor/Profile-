"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const particleCount = 150;
  const maxDistance = 2.5;

  const dataRef = useRef<{
    positions: Float32Array;
    velocities: { x: number; y: number; z: number }[];
    linePositions: Float32Array;
    lineColors: Float32Array;
  } | null>(null);

  const [initialData] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const initial = {
      positions: pos,
      velocities: vel,
      linePositions: new Float32Array(maxLines * 6),
      lineColors: new Float32Array(maxLines * 6)
    };
    
    return initial;
  });

  const { positions, linePositions, lineColors } = initialData;

  useEffect(() => {
    dataRef.current = initialData;
  }, [initialData]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current || !dataRef.current) return;
    
    const { velocities, linePositions, lineColors } = dataRef.current;

    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const pos = positionsAttr.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      // Bounce off boundaries
      if (Math.abs(pos[i * 3]) > 7.5) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 7.5) velocities[i].y *= -1;
      if (pos[i * 3 + 2] > 2 || pos[i * 3 + 2] < -15) velocities[i].z *= -1;
    }
    positionsAttr.needsUpdate = true;

    // Update lines based on distance
    let vertexpos = 0;
    let colorpos = 0;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          const alpha = 1.0 - dist / maxDistance;
          
          linePositions[vertexpos++] = pos[i * 3];
          linePositions[vertexpos++] = pos[i * 3 + 1];
          linePositions[vertexpos++] = pos[i * 3 + 2];
          
          linePositions[vertexpos++] = pos[j * 3];
          linePositions[vertexpos++] = pos[j * 3 + 1];
          linePositions[vertexpos++] = pos[j * 3 + 2];

          // Color #06B6D4 (Cyan 500) -> 0.023, 0.713, 0.831
          lineColors[colorpos++] = 0.023;
          lineColors[colorpos++] = 0.713;
          lineColors[colorpos++] = 0.831;
          lineColors[colorpos++] = alpha * 0.5;

          lineColors[colorpos++] = 0.023;
          lineColors[colorpos++] = 0.713;
          lineColors[colorpos++] = 0.831;
          lineColors[colorpos++] = alpha * 0.5;
        }
      }
    }

    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineColorAttr = linesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    
    // Set update ranges
    linesRef.current.geometry.setDrawRange(0, vertexpos / 3);
    linePosAttr.needsUpdate = true;
    lineColorAttr.needsUpdate = true;
    
    // Slowly rotate the whole network
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
    linesRef.current.rotation.x += 0.0005;

    // Interactive movement based on mouse and scroll
    if (groupRef.current) {
      const targetRotationX = -mouseRef.current.y * 0.5;
      const targetRotationY = mouseRef.current.x * 0.5;
      const targetPositionY = scrollRef.current * 0.005;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPositionY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
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
          size={0.05}
          color="#2563EB"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 4]}
            count={lineColors.length / 4}
            array={lineColors}
            itemSize={4}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
