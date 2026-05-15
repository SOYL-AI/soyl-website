'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MINT = new THREE.Color('#AFD0CC')
const STAR_WHITE = new THREE.Color('#F8FCFD')

// --- Wave terrain ---------------------------------------------------------
// Custom shader gives us two wins the wireframe primitive can't:
//   1. Smoothly displaced vertices (sine-on-sine on-time), so the "ocean"
//      visibly breathes rather than sitting flat.
//   2. An orthogonal grid (not triangulated), drawn antialiased via fwidth.
//      Reads like the Vapi reference; triangle wireframes do not.

const terrainVertex = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    vUv = uv;
    vec3 p = position;
    float dist = length(p.xy);
    // Distance falloff: waves are tallest near the camera, flatten outward.
    float falloff = smoothstep(22.0, 0.0, dist);
    float wave =
      sin(p.x * 0.28 + uTime * 0.55) * 0.42 +
      cos(p.y * 0.32 + uTime * 0.40) * 0.32 +
      sin((p.x + p.y) * 0.18 - uTime * 0.48) * 0.18;
    p.z = wave * falloff;
    vDist = dist;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const terrainFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    // Orthogonal grid lines: 80 cells across X, 40 across Y.
    vec2 cells = vec2(80.0, 40.0);
    vec2 g = abs(fract(vUv * cells - 0.5) - 0.5);
    vec2 d = fwidth(vUv * cells);
    vec2 line = smoothstep(vec2(0.0), d * 1.4, g);
    float minLine = min(line.x, line.y);
    float alpha = (1.0 - minLine);
    // Brighter near camera, fade with horizon distance.
    alpha *= smoothstep(28.0, 1.5, vDist) * 0.55;
    if (alpha < 0.005) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`

// Module-level so React Compiler doesn't flag the per-frame mutation as
// "modifying a hook return". There is only ever one terrain on the page
// and Three.js treats uniforms as material-singletons anyway.
const TERRAIN_UNIFORMS = {
  uTime:  { value: 0 },
  uColor: { value: MINT },
}

function WaveTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)

  // 80×40 segments matches the shader's grid cell count so the lines align
  // with the actual triangulation, keeping displacement crisp at every line.
  const geometry = useMemo(() => new THREE.PlaneGeometry(50, 26, 80, 40), [])

  useFrame(state => {
    TERRAIN_UNIFORMS.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, -1.1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <shaderMaterial
        vertexShader={terrainVertex}
        fragmentShader={terrainFragment}
        uniforms={TERRAIN_UNIFORMS}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// --- Dotted hemisphere (the "rising sun") --------------------------------
// Currently unmounted from the Canvas — kept here so it's a one-line
// switch to bring back. Add <DottedHemisphere /> to the Canvas children.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DottedHemisphere() {
  const pointsRef = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    // Fibonacci hemisphere — uniform point distribution across the upper
    // half of a unit sphere. 900 dots is dense enough to read as a solid
    // silhouette without taxing the GPU.
    const N = 900
    const positions = new Float32Array(N * 3)
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < N; i++) {
      const y = 1 - i / (N - 1) // top of sphere → equator
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      positions[i * 3]     = Math.cos(theta) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(theta) * radius
    }
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geom
  }, [])

  useFrame(state => {
    if (!pointsRef.current) return
    // Slow rotation — the sun "turning" without ever being distracting.
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075
  })

  // Two passes: the main dot field, plus a softer "bloom" with bigger,
  // dimmer points behind it for a cheap halo.
  return (
    <group position={[0, -0.6, 0]} scale={2.7}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color={MINT}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={1.0}
          depthWrite={false}
        />
      </points>
      <points geometry={geometry}>
        <pointsMaterial
          color={MINT}
          size={0.13}
          sizeAttenuation
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

// --- Stars ----------------------------------------------------------------
// Deterministic PRNG so the constellation is stable across re-renders.
// React Compiler's purity rule rejects Math.random() inside useMemo.
function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Stars() {
  const geometry = useMemo(() => {
    const N = 110
    const positions = new Float32Array(N * 3)
    const sizes = new Float32Array(N)
    const rng = seeded(0x5071_C100)
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = (rng() - 0.5) * 32
      positions[i * 3 + 1] = rng() * 9 + 0.8
      positions[i * 3 + 2] = (rng() - 0.5) * 14 - 5
      sizes[i] = rng() * 0.5 + 0.5
    }
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geom
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={STAR_WHITE}
        size={0.038}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  )
}

// --- Canvas root ---------------------------------------------------------

export default function CareersHeroVisual() {
  return (
    <Canvas
      camera={{ position: [0, 0.55, 7.2], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="w-full h-full"
    >
      <Stars />
      <WaveTerrain />
    </Canvas>
  )
}
