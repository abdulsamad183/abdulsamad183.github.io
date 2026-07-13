import type { InteriorRoomConfig } from '../../../config/interiorContent'
import { InteriorRoomShell } from './InteriorRoomShell'
import {
  InteriorCabinet,
  InteriorCornerUnits,
  InteriorDesk,
  InteriorFloorTiles,
  InteriorShelf,
  InteriorViewport,
  InteriorWallRail,
} from './InteriorFurniture'
import { InteriorGltfProp } from './InteriorGltfProp'

interface InteriorRoomProps {
  room: InteriorRoomConfig
}

/** Furnished cyberpunk interior — enclosed room with desks, shelves, and wall fixtures */
export function InteriorRoom({ room }: InteriorRoomProps) {
  const accent = room.accent

  return (
    <group>
      <InteriorRoomShell accent={accent} />
      <InteriorFloorTiles />
      <InteriorCornerUnits accent={accent} />
      <InteriorViewport accent={accent} />

      {/* Room-specific furniture layout */}
      {room.districtId === 'projects' && (
        <>
          <InteriorDesk position={[0, 0, -1.8]} width={6} accent={accent} />
          <InteriorCabinet position={[0, 0, 0.8]} accent={accent} />
          <group position={[0, 0.72, -1.8]} scale={0.9}>
            <InteriorGltfProp asset="computer_large" groundAlign={false} emissive={accent} emissiveIntensity={0.2} />
          </group>
        </>
      )}

      {room.districtId === 'publications' && (
        <>
          <InteriorShelf position={[0, 0, -3.12]} accent={accent} />
          <InteriorDesk position={[0, 0, -0.5]} width={3.5} accent={accent} />
        </>
      )}

      {room.districtId === 'experience' && (
        <>
          <InteriorWallRail position={[0, 1.55, -3.18]} width={6.2} accent={accent} />
          <InteriorDesk position={[0, 0, 0.2]} width={4} accent={accent} />
        </>
      )}

      {room.districtId === 'education' && (
        <>
          <InteriorWallRail position={[-2.2, 1.65, -3.18]} width={2.2} accent={accent} />
          <InteriorShelf position={[0.2, 0, -3.12]} accent={accent} />
          <InteriorDesk position={[2.2, 0, -1.4]} width={2.4} accent={accent} />
          <InteriorDesk position={[-1.8, 0, 0.5]} width={2.8} accent="#ffb703" />
        </>
      )}

      {room.districtId === 'resume' && (
        <>
          <InteriorCabinet position={[0, 0, -2.2]} accent={accent} />
          <InteriorDesk position={[0, 0, -0.3]} width={4.5} accent={accent} />
        </>
      )}

      {room.districtId === 'contact' && (
        <>
          <InteriorDesk position={[0, 0, -1.6]} width={3.2} accent={accent} />
          <group position={[-3.2, 0, 1.8]} scale={0.7}>
            <InteriorGltfProp asset="light_street" emissive="#ff2079" emissiveIntensity={0.35} />
          </group>
          <group position={[3.2, 0, 1.8]} scale={0.7}>
            <InteriorGltfProp asset="light_street" emissive={accent} emissiveIntensity={0.35} />
          </group>
        </>
      )}

      {/* Room lighting */}
      <pointLight position={[0, 2.8, 0]} intensity={0.5} color="#8899cc" distance={10} decay={2} />
      <pointLight position={[0, 1.6, -2.5]} intensity={0.45} color={accent} distance={7} decay={2} />
      <pointLight position={[-3, 1.4, 1]} intensity={0.2} color="#b026ff" distance={5} decay={2} />
      <pointLight position={[3, 1.4, 1]} intensity={0.2} color={accent} distance={5} decay={2} />
      <directionalLight position={[2, 5, 4]} intensity={0.28} color="#6688aa" castShadow />
    </group>
  )
}
