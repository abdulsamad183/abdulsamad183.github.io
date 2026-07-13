import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import type { Group } from 'three'
import type { DistrictBuildingConfig } from '../config/cityLayout'
import { GltfBuilding } from './GltfBuilding'
import { InteractionManager } from '../engine/InteractionManager'
import { useCityStore } from '../store/cityStore'

function useBuildingInteraction(config: DistrictBuildingConfig) {
  const cityView = useCityStore((s) => s.cityView)
  const isTransitioning = useCityStore((s) => s.isTransitioning)

  const handleClick = (e?: { stopPropagation: () => void }) => {
    e?.stopPropagation()
    if (isTransitioning || !config.interactive) return
    if (cityView === 'overview') InteractionManager.flyTo(config.districtId)
  }

  const handlePointerOver = (e?: { stopPropagation: () => void }) => {
    e?.stopPropagation()
    InteractionManager.setHovered(config.districtId)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    InteractionManager.setHovered(null)
    document.body.style.cursor = 'default'
  }

  return { handleClick, handlePointerOver, handlePointerOut }
}

export function HologramLabel({
  config,
  hovered,
  active,
}: {
  config: DistrictBuildingConfig
  hovered: boolean
  active: boolean
}) {
  const groupRef = useRef<Group>(null)
  const labelY = config.hitbox[1] + 3.5
  const { handleClick, handlePointerOver, handlePointerOut } = useBuildingInteraction(config)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.5) * 0.04
    groupRef.current.scale.setScalar(hovered || active ? pulse * 1.08 : pulse)
  })

  return (
    <Billboard
      ref={groupRef}
      position={[config.position[0], labelY, config.position[2]]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Large invisible click pad behind label */}
      <mesh position={[0, 0.1, -0.05]}>
        <planeGeometry args={[5.5, hovered ? 1.4 : 1.2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh position={[0, 0.12, -0.03]}>
        <planeGeometry args={[3.4, hovered ? 1.1 : 0.95]} />
        <meshBasicMaterial color="#040818" transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0.12, -0.04]}>
        <planeGeometry args={[3.55, hovered ? 1.2 : 1.02]} />
        <meshBasicMaterial color={config.accent} transparent opacity={hovered ? 0.55 : 0.3} />
      </mesh>
      <Text position={[0, 0.32, 0]} fontSize={hovered ? 0.42 : 0.36} color={config.accent} anchorX="center" anchorY="middle">
        {config.label}
      </Text>
      <Text position={[0, 0.02, 0]} fontSize={0.12} color="#a8c8e8" anchorX="center" anchorY="middle" maxWidth={3}>
        {config.subtitle}
      </Text>
    </Billboard>
  )
}

export function DistrictBuilding({ config }: { config: DistrictBuildingConfig }) {
  const hoveredDistrictId = useCityStore((s) => s.hoveredDistrictId)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)
  const intensity = hoveredDistrictId === config.districtId ? 1.1 : activeDistrictId === config.districtId ? 0.75 : 0.35
  const hovered = hoveredDistrictId === config.districtId
  const active = activeDistrictId === config.districtId
  const { handleClick, handlePointerOver, handlePointerOut } = useBuildingInteraction(config)

  const [hx, hy, hz] = config.hitbox
  const clickRadius = Math.max(hx, hz) * 0.65

  return (
    <group position={config.position} rotation={config.rotation ?? [0, 0, 0]}>
      <GltfBuilding
        asset={config.asset}
        emissive={config.emissive}
        emissiveIntensity={intensity}
        scale={config.scale}
      />

      <HologramLabel config={config} hovered={hovered} active={active} />

      {hovered && (
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[clickRadius * 0.7, clickRadius * 0.95, 48]} />
          <meshBasicMaterial color={config.accent} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Ground click disc — easy to hit from overview camera */}
      <mesh
        position={[0, 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <circleGeometry args={[clickRadius, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Vertical click volume around building */}
      <mesh
        position={[0, hy / 2, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[hx, hy, hz]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}
