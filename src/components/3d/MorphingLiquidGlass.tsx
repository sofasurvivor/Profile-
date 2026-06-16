"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader implementation for Simplex Noise and Glass-like iridescence
const MorphingShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uNoiseSpeed: { value: 0.4 },
    uNoiseStrength: { value: 0.3 },
    uNoiseDensity: { value: 0.8 },
    uScrollPos: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uOpacity: { value: 1.0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uNoiseSpeed;
    uniform float uNoiseStrength;
    uniform float uNoiseDensity;
    uniform float uScrollPos;
    uniform vec2 uMouse;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying float vNoise;

    // Ian McEwan, Ashima Arts - Simplex Noise 3D
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      // Calculate dynamic noise displacement
      vec3 noiseInput = position * uNoiseDensity + vec3(0.0, 0.0, uTime * uNoiseSpeed + uScrollPos * 0.1);
      
      // Mouse interaction deforms the mesh slightly on vertex positions
      float mouseDist = distance(position.xy, uMouse * 3.0);
      float mouseFactor = smoothstep(4.0, 0.0, mouseDist) * 0.4;
      
      float noiseVal = snoise(noiseInput);
      vNoise = noiseVal;
      float displacement = (noiseVal + mouseFactor) * uNoiseStrength;

      vec3 displacedPosition = position + normal * displacement;
      
      // Dynamic normal calculation based on finite differences
      float e = 0.02;
      vec3 t = cross(normal, vec3(0.0, 1.0, 0.0));
      if (length(t) < 0.05) {
        t = cross(normal, vec3(1.0, 0.0, 0.0));
      }
      t = normalize(t);
      vec3 b = normalize(cross(normal, t));

      vec3 posT = position + t * e;
      vec3 posB = position + b * e;

      float noiseT = snoise(posT * uNoiseDensity + vec3(0.0, 0.0, uTime * uNoiseSpeed + uScrollPos * 0.1));
      float noiseB = snoise(posB * uNoiseDensity + vec3(0.0, 0.0, uTime * uNoiseSpeed + uScrollPos * 0.1));

      vec3 dispT = posT + normalize(posT) * (noiseT + mouseFactor) * uNoiseStrength;
      vec3 dispB = posB + normalize(posB) * (noiseB + mouseFactor) * uNoiseStrength;

      vec3 calculatedNormal = normalize(cross(dispT - displacedPosition, dispB - displacedPosition));

      vNormal = normalMatrix * calculatedNormal;
      
      vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
      vPosition = displacedPosition;
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScrollPos;
    uniform float uOpacity;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying float vNoise;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Fresnel factor for glassy/metallic edge highlights
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);

      // Gradient color mapping - Cyberpunk cyan-purple chromatic shift
      vec3 baseColor = vec3(0.02, 0.03, 0.08); // Dark deep space navy
      vec3 primaryGlow = vec3(0.0, 0.94, 1.0); // Neon Cyan #00F0FF
      vec3 secondaryGlow = vec3(0.55, 0.36, 0.96); // Electric Purple #8B5CF6
      vec3 ambientReflect = vec3(0.08, 0.12, 0.25);

      // Chromatic dispersion color based on normal
      vec3 iridescence = 0.5 + 0.5 * cos(uTime * 0.15 + normal.xyz * 2.5 + vec3(0.0, 2.0, 4.0));
      iridescence = mix(iridescence, primaryGlow, 0.2);

      // Direct light source simulation
      vec3 lightPos = vec3(5.0, 5.0, 8.0);
      vec3 lightDir = normalize(lightPos - vPosition);
      float diffuse = max(dot(normal, lightDir), 0.0);

      // Sharp specular highlight for glossiness
      vec3 halfDir = normalize(lightDir + viewDir);
      float specular = pow(max(dot(normal, halfDir), 0.0), 64.0);

      // Blending terms
      vec3 color = mix(baseColor, ambientReflect, diffuse * 0.4);
      color = mix(color, secondaryGlow, vNoise * 0.35 + 0.1);
      color = mix(color, iridescence, fresnel * 0.75);
      color += vec3(1.0) * specular * 0.8; // High reflection highlight
      color += primaryGlow * pow(fresnel, 1.5) * 0.4; // Outer glow accent

      gl_FragColor = vec4(color, 0.9 * uOpacity);
    }
  `
};

export default function MorphingLiquidGlass() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Mouse vector tracking
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smoothly track mouse coordinates
    const pointer = state.pointer; // Normalized between -1 and 1
    mouseRef.current.lerp(pointer, 0.08);

    // Track scroll position from state
    if (typeof window !== "undefined") {
      scrollRef.current = THREE.MathUtils.lerp(scrollRef.current, window.scrollY, 0.05);
    }

    const scrollFactor = Math.min(scrollRef.current / 1000, 1.0);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uScrollPos.value = scrollRef.current;
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
      materialRef.current.uniforms.uOpacity.value = 1.0 - scrollFactor;
    }

    if (meshRef.current) {
      // Gentle orbit rotation that speeds up with scroll
      const rotationMultiplier = 1.0 + scrollRef.current * 0.001;
      meshRef.current.rotation.y = time * 0.05 * rotationMultiplier;
      meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.2;
      
      // Floating motion
      meshRef.current.position.y = Math.sin(time * 0.4) * 0.15;
      
      // Shrink and reposition depending on scroll depth to move out of the way of text panels
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(1.0, 0.0, scrollFactor));
      
      // Shift left/right depending on scroll to create an interactive layout feel
      const targetX = THREE.MathUtils.lerp(0.0, 1.5, scrollFactor);
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    }
  });

  // Memoize shaders uniforms
  const uniforms = useMemo(() => THREE.UniformsUtils.clone(MorphingShaderMaterial.uniforms), []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 96, 96]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={MorphingShaderMaterial.vertexShader}
        fragmentShader={MorphingShaderMaterial.fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={true}
      />
    </mesh>
  );
}

