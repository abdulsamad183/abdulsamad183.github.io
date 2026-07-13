import type { DistrictId } from '../../../types/city'
import { INTERIOR_ROOMS } from '../../../config/interiorContent'
import { InteriorAssetManager } from './InteriorGltfProp'
import { InteriorRoom } from './InteriorRoom'
import { InteriorItem } from './InteriorItem'
import { useEffect } from 'react'
import { ContactShadows, Environment } from '@react-three/drei'

export function InteriorScene({ districtId }: { districtId: DistrictId }) {
  const room = INTERIOR_ROOMS[districtId as keyof typeof INTERIOR_ROOMS]

  useEffect(() => {
    InteriorAssetManager.preloadAll()
  }, [])

  if (!room) return null

  return (
    <>
      <color attach="background" args={['#050810']} />
      <fog attach="fog" args={['#050810', 6, 14]} />
      <Environment preset="warehouse" />
      <ambientLight intensity={0.18} color="#1a2040" />
      <hemisphereLight args={['#2a4070', '#060a14', 0.35]} />
      <InteriorRoom room={room} />
      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.45}
        scale={12}
        blur={2.2}
        far={4}
        color="#000814"
      />
      {room.items.map((item) => (
        <InteriorItem key={item.id} item={item} accent={room.accent} />
      ))}
    </>
  )
}
