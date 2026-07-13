import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { DistrictManager } from '../engine/DistrictManager'
import { GltfBuilding } from './GltfBuilding'
import { HologramLabel } from './DistrictBuilding'
import { useCityStore } from '../store/cityStore'

/** AI Core — GLB tower + atmospheric effects (not building geometry) */
export function AICoreTower() {
  const core = DistrictManager.getByDistrictId('city-core')!
  const hoveredDistrictId = useCityStore((s) => s.hoveredDistrictId)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)
  const hovered = hoveredDistrictId === 'city-core'
  const active = activeDistrictId === 'city-core'
  const beamRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.18 + Math.sin(t * 1.2) * 0.05
    }
    if (ringRef.current) ringRef.current.rotation.y = t * 0.35
  })

  return (
    <group position={core.position}>
      <GltfBuilding asset={core.asset} emissive={core.emissive} emissiveIntensity={0.65} scale={core.scale} />
      <HologramLabel config={core} hovered={hovered} active={active} />

      {/* Energy beam — effect layer */}
      <mesh ref={beamRef} position={[0, 28, 0]}>
        <cylinderGeometry args={[0.4, 1.0, 35, 12, 1, true]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Platform ring */}
      <mesh ref={ringRef} position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[12, 0.12, 16, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[13, 48]} />
        <meshStandardMaterial color="#0a1020" emissive="#00b8d4" emissiveIntensity={0.25} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}
