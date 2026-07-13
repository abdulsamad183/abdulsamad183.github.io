import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export interface BeamConfig {
  position: [number, number, number]
  height: number
  color: string
  opacity?: number
  radius?: number
}

/** Atmospheric volumetric beams — post-process effect layer, not building geometry */
function VolumetricBeam({
  position,
  height,
  color,
  opacity = 0.12,
  radius = 0.35,
}: BeamConfig) {
  const ref = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const mat = ref.current.material
    if (!Array.isArray(mat) && 'opacity' in mat) {
      mat.opacity = opacity + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.03
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[radius * 0.3, radius, height, 8, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

const BEAMS: BeamConfig[] = [
  { position: [0, 12, 0], height: 26, color: '#00f5ff', opacity: 0.2, radius: 0.55 },
  { position: [-12, 8, -8], height: 16, color: '#b026ff', opacity: 0.11, radius: 0.32 },
  { position: [12, 9, -8], height: 18, color: '#00f5ff', opacity: 0.12, radius: 0.34 },
  { position: [-14, 7, 4], height: 14, color: '#ff2079', opacity: 0.1, radius: 0.28 },
  { position: [14, 7.5, 4], height: 15, color: '#b026ff', opacity: 0.11, radius: 0.3 },
  { position: [0, 6, -14], height: 12, color: '#00f5ff', opacity: 0.09, radius: 0.26 },
  { position: [-7, 7, -3], height: 10, color: '#00f5ff', opacity: 0.08, radius: 0.22 },
  { position: [7, 7.5, -3], height: 11, color: '#ff2079', opacity: 0.09, radius: 0.24 },
]

export function LightBeams() {
  return (
    <group>
      {BEAMS.map((beam, i) => (
        <VolumetricBeam key={i} {...beam} />
      ))}
    </group>
  )
}

export function TowerBeam({
  position,
  height,
  color = '#00f5ff',
}: {
  position: [number, number, number]
  height: number
  color?: string
}) {
  return (
    <VolumetricBeam
      position={[position[0], position[1] + height / 2, position[2]]}
      height={height}
      color={color}
      opacity={0.15}
      radius={0.22}
    />
  )
}
