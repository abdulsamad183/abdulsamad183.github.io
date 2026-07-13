import { InteriorGltfProp } from './InteriorGltfProp'

const DESK_TOP = 0.72

/** Long desk along the back of the room */
export function InteriorDesk({
  position = [0, 0, -2.1] as [number, number, number],
  width = 5.2,
  accent = '#00e5ff',
}) {
  return (
    <group position={position}>
      <mesh position={[0, DESK_TOP - 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.08, 0.85]} />
        <meshStandardMaterial color="#1a2438" metalness={0.7} roughness={0.35} />
      </mesh>
      {[-width / 2 + 0.25, width / 2 - 0.25].map((x) => (
        <mesh key={x} position={[x, DESK_TOP / 2, 0]} castShadow>
          <boxGeometry args={[0.12, DESK_TOP, 0.7]} />
          <meshStandardMaterial color="#0f1728" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, DESK_TOP - 0.01, 0.38]}>
        <boxGeometry args={[width - 0.2, 0.02, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} metalness={0.8} />
      </mesh>
    </group>
  )
}

/** Wall-mounted shelf unit */
export function InteriorShelf({
  position = [-2.6, 0, -3.15] as [number, number, number],
  accent = '#b026ff',
}) {
  return (
    <group position={position}>
      {[0.55, 1.15, 1.75].map((y) => (
        <mesh key={y} position={[0, y, 0.12]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.06, 0.35]} />
          <meshStandardMaterial color="#151f30" metalness={0.65} roughness={0.4} />
        </mesh>
      ))}
      {[-1.1, 1.1].map((x) => (
        <mesh key={x} position={[x, 1.15, 0.1]} castShadow>
          <boxGeometry args={[0.08, 2.3, 0.3]} />
          <meshStandardMaterial color="#0d1525" metalness={0.55} roughness={0.45} />
        </mesh>
      ))}
      <mesh position={[0, 2.35, 0.14]}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

/** Low cabinet for folders / crates */
export function InteriorCabinet({
  position = [0, 0, -1.2] as [number, number, number],
  accent = '#00e5ff',
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.9, 0.65]} />
        <meshStandardMaterial color="#121c2e" metalness={0.6} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[2.82, 0.04, 0.67]} />
        <meshStandardMaterial color="#1e2a42" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.45, 0.34]}>
        <boxGeometry args={[2.6, 0.02, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

/** Wall frame rail for certificates / experience plaques */
export function InteriorWallRail({
  position = [0, 1.55, -3.18] as [number, number, number],
  width = 5.5,
  accent = '#00e5ff',
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width, 0.06, 0.08]} />
        <meshStandardMaterial color="#1a2540" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.04, 0.02]}>
        <boxGeometry args={[width, 0.02, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} />
      </mesh>
    </group>
  )
}

/** Corner server / climate units flush to walls */
export function InteriorCornerUnits({ accent = '#00e5ff' }) {
  return (
    <>
      <group position={[-3.55, 0, -2.8]} rotation={[0, 0.15, 0]} scale={0.85}>
        <InteriorGltfProp asset="ac_side" emissive="#b026ff" emissiveIntensity={0.12} />
      </group>
      <group position={[3.55, 0, -2.8]} rotation={[0, -0.15, 0]} scale={0.85}>
        <InteriorGltfProp asset="ac_unit" emissive={accent} emissiveIntensity={0.12} />
      </group>
    </>
  )
}

// Back-wall city viewport screen
export function InteriorViewport({ accent = '#00e5ff' }) {
  return (
    <group position={[0, 2.05, -3.22]}>
      <mesh>
        <boxGeometry args={[2.6, 1.1, 0.06]} />
        <meshStandardMaterial color="#080c18" metalness={0.8} roughness={0.2} />
      </mesh>
      <group position={[0, 0, 0.05]} scale={0.75}>
        <InteriorGltfProp asset="tv_3" groundAlign={false} emissive={accent} emissiveIntensity={0.5} />
      </group>
    </group>
  )
}

/** Floor accent tiles using Quaternius platform pieces */
export function InteriorFloorTiles() {
  const tiles: [number, number][] = [
    [-2.5, 1.5],
    [0, 1.5],
    [2.5, 1.5],
    [-2.5, -0.5],
    [0, -0.5],
    [2.5, -0.5],
  ]
  return (
    <>
      {tiles.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, 0.01, z]} scale={0.42}>
          <InteriorGltfProp asset="floor_platform" emissive="#00e5ff" emissiveIntensity={0.04} />
        </group>
      ))}
    </>
  )
}

export const INTERIOR_DESK_HEIGHT = DESK_TOP
