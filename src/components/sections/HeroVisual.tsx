'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AnimatedVisual() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  // Fluid continuous rotation and mouse parallax
  useFrame((state) => {
    if (outerRef.current && innerRef.current) {
      // Rotation logic
      outerRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      outerRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      innerRef.current.rotation.x = state.clock.getElapsedTime() * -0.1
      innerRef.current.rotation.y = state.clock.getElapsedTime() * -0.15

      // Mouse parallax
      const targetX = state.pointer.x * 0.4
      const targetY = state.pointer.y * 0.4
      outerRef.current.position.x += (targetX - outerRef.current.position.x) * 0.05
      outerRef.current.position.y += (targetY - outerRef.current.position.y) * 0.05
      
      // Sync inner core to follow the outer mesh
      innerRef.current.position.copy(outerRef.current.position)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Outer morphing wireframe geometric network */}
      <Sphere ref={outerRef} args={[1, 32, 32]} scale={2.2}>
        <MeshDistortMaterial
          color="#AFD0CC" // Mint
          emissive="#AFD0CC"
          emissiveIntensity={0.4}
          attach="material"
          distort={0.4}
          speed={1.5}
          wireframe={true}
        />
      </Sphere>

      {/* Inner solid deep dark core */}
      <Sphere ref={innerRef} args={[1, 32, 32]} scale={1.6}>
        <meshStandardMaterial 
          color="#030709" // Obsidian backdrop
          roughness={0.3}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

export default function HeroVisual() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 13], fov: 45 }} className="w-full h-full">
        {/* Soft immersive volumetric lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#AFD0CC" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} />
        <spotLight position={[0, 10, 0]} intensity={1} color="#AFD0CC" penumbra={1} />
        
        <AnimatedVisual />
      </Canvas>
    </div>
  )
}
