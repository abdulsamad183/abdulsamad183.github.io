import { useState } from 'react'
import { Text } from '@react-three/drei'
import type { InteriorItemConfig } from '../../../config/interiorContent'
import { INTERIOR_PROP_SCALE } from '../../../config/interiorAssets'
import { useCityStore } from '../../../store/cityStore'
import { InteriorPropMesh } from './InteriorPropMesh'

const LABEL_OFFSET: Record<string, number> = {
  frame: 0.55,
  diploma: 0.65,
  book: 0.35,
  monitor: 0.85,
  terminal: 0.9,
  crate: 0.55,
  hologram: 1.1,
  bookshelf: 1.35,
  folder: 0.45,
  default: 0.75,
}

const WALL_PROPS = new Set(['frame', 'diploma', 'book'])

function ItemMount({ prop, accent }: { prop: string; accent: string }) {
  if (WALL_PROPS.has(prop)) {
    return (
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[0.9, 0.02, 0.06]} />
        <meshStandardMaterial color="#1a2540" emissive={accent} emissiveIntensity={0.12} metalness={0.7} />
      </mesh>
    )
  }
  if (prop === 'bookshelf') return null
  return (
    <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[0.55, 24]} />
      <meshStandardMaterial color="#0d1528" metalness={0.6} roughness={0.45} emissive={accent} emissiveIntensity={0.06} />
    </mesh>
  )
}

export function InteriorItem({
  item,
  accent,
}: {
  item: InteriorItemConfig
  accent: string
}) {
  const [hovered, setHovered] = useState(false)
  const openPanel = useCityStore((s) => s.openPanel)
  const panelOpen = useCityStore((s) => s.panelContent !== null)

  const propScale = INTERIOR_PROP_SCALE[item.prop]
  const labelY = LABEL_OFFSET[item.prop] ?? LABEL_OFFSET.default
  const clickSize = Math.max(0.9, propScale * 0.85)

  return (
    <group position={item.position} rotation={item.rotation ?? [0, 0, 0]} scale={item.scale ?? 1}>
      <ItemMount prop={item.prop} accent={accent} />

      <group
        onClick={(e) => {
          e.stopPropagation()
          if (!panelOpen) openPanel(item.panel)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <InteriorPropMesh type={item.prop} hovered={hovered} />

        <mesh position={[0, clickSize / 2, 0]}>
          <boxGeometry args={[clickSize, clickSize, clickSize]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>

      <Text
        position={[0, labelY, WALL_PROPS.has(item.prop) ? -0.05 : 0]}
        fontSize={hovered ? 0.14 : 0.11}
        color={hovered ? '#00e5ff' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.012}
        outlineColor="#040818"
      >
        {item.label}
      </Text>

      {hovered && (
        <mesh
          position={[0, 0.03, WALL_PROPS.has(item.prop) ? -0.02 : 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[clickSize * 0.35, clickSize * 0.5, 32]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.45} />
        </mesh>
      )}
    </group>
  )
}
