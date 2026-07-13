import { useState } from 'react'
import { Billboard, Text } from '@react-three/drei'
import type { BuildingSceneObject } from '../../../types/scene'
import { useCityStore } from '../../../store/cityStore'
import { CityAsset } from '../CityAsset'

export function Building({ config }: { config: BuildingSceneObject }) {
  const [hovered, setHovered] = useState(false)
  const flyToBuilding = useCityStore((s) => s.flyToBuilding)
  const cityView = useCityStore((s) => s.cityView)
  const viewMode = useCityStore((s) => s.viewMode)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)
  const isTransitioning = useCityStore((s) => s.isTransitioning)

  const interaction = config.interaction
  const districtId = interaction?.districtId
  const isActive = districtId != null && activeDistrictId === districtId
  const highlighted = Boolean(interaction) && (hovered || (cityView === 'building' && isActive))

  const [hx, hy] = interaction?.hitbox ?? [1, 2, 1]
  const labelY = config.position[1] + hy + 1.2
  const showOverviewLabel = cityView === 'overview' && viewMode === 'city' && interaction

  const handleClick = () => {
    if (!interaction?.explorable || isTransitioning || viewMode === 'interior') return
    flyToBuilding(interaction.districtId)
  }

  return (
    <group>
      <CityAsset
        asset={config.asset}
        position={config.position}
        rotation={config.rotation}
        scale={config.scale}
        groundAlign={config.groundAlign ?? true}
      />

      {interaction && viewMode === 'city' && (
        <>
          <mesh
            position={[config.position[0], config.position[1] + hy / 2, config.position[2]]}
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              if (interaction.explorable) {
                setHovered(true)
                document.body.style.cursor = 'pointer'
              }
            }}
            onPointerOut={() => {
              setHovered(false)
              document.body.style.cursor = 'default'
            }}
          >
            <boxGeometry args={[hx, hy, hx]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* Always-visible name tags in top-down overview */}
          {showOverviewLabel && (
            <Billboard position={[config.position[0], labelY, config.position[2]]}>
              <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[2.4, 0.42]} />
                <meshBasicMaterial color={hovered ? '#ffffff' : '#f8fafc'} transparent opacity={0.95} />
              </mesh>
              <mesh position={[0, 0, -0.03]}>
                <planeGeometry args={[2.5, 0.5]} />
                <meshBasicMaterial color={interaction.color} transparent opacity={0.35} />
              </mesh>
              <Text
                fontSize={0.17}
                color={hovered ? '#0f4c81' : '#1e3a5f'}
                anchorX="center"
                anchorY="middle"
                maxWidth={2.2}
                textAlign="center"
                fontWeight={600}
              >
                {interaction.label.toUpperCase()}
              </Text>
            </Billboard>
          )}

          {cityView === 'building' && highlighted && (
            <Billboard position={[config.position[0], labelY, config.position[2]]}>
              <Text
                fontSize={0.2}
                color="#1e3a5f"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#ffffff"
              >
                {interaction.label}
              </Text>
            </Billboard>
          )}
        </>
      )}
    </group>
  )
}
