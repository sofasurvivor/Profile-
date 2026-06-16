"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import MorphingLiquidGlass from "./MorphingLiquidGlass";
import InteractiveParticles from "./InteractiveParticles";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="city" />
        
        <MorphingLiquidGlass />
        <InteractiveParticles />
      </Canvas>
    </div>
  );
}
