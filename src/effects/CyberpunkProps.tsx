import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { CITY_PROP_SCATTER } from '../config/props'
import { CityProp } from './CityProp'

function FloatingDrone({
  placement,
}: {
  placement: (typeof CITY_PROP_SCATTER)[number]
}) {
  const ref = useRef<Group>(null)
  const baseY = placement.position[1]

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.y = baseY + Math.sin(t * 0.8 + placement.position[0]) * 0.4
    ref.current.rotation.y += 0.004
  })

  return (
    <group ref={ref} position={placement.position}>
      <CityProp
        asset={placement.asset}
        position={[0, 0, 0]}
        rotation={placement.rotation}
        scale={placement.scale}
        emissive="#ff2079"
      />
    </group>
  )
}

/** Quaternius cyberpunk street dressing */
export function CyberpunkProps() {
  return (
    <group>
      {CITY_PROP_SCATTER.map((p) =>
        p.asset === 'drone' ? (
          <FloatingDrone key={p.id} placement={p} />
        ) : (
          <CityProp
            key={p.id}
            asset={p.asset}
            position={p.position}
            rotation={p.rotation}
            scale={p.scale}
            emissive={p.asset.startsWith('light_') ? '#00e5ff' : '#b026ff'}
          />
        ),
      )}
    </group>
  )
}
