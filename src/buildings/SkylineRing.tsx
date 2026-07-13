import { SKYLINE_RING } from '../config/cityLayout'
import { GltfBuilding } from './GltfBuilding'

export function SkylineRing() {
  return (
    <group>
      {SKYLINE_RING.map((s) => (
        <group key={s.id} position={s.position} rotation={s.rotation ?? [0, 0, 0]}>
          <GltfBuilding asset={s.asset} emissive="#1a3060" emissiveIntensity={0.2} scale={s.scale} />
        </group>
      ))}
    </group>
  )
}
