import { useMemo } from 'react'
import * as THREE from 'three'

const ROOM = {
  width: 8,
  depth: 7,
  height: 3.2,
  wall: 0.14,
} as const

function useRoomMaterials(accent: string) {
  return useMemo(() => {
    const glow = new THREE.Color(accent)
    return {
      floor: new THREE.MeshStandardMaterial({
        color: '#0a101c',
        metalness: 0.65,
        roughness: 0.38,
      }),
      wall: new THREE.MeshStandardMaterial({
        color: '#111827',
        metalness: 0.45,
        roughness: 0.55,
      }),
      ceiling: new THREE.MeshStandardMaterial({
        color: '#060a12',
        metalness: 0.3,
        roughness: 0.85,
      }),
      trim: new THREE.MeshStandardMaterial({
        color: '#1a2540',
        emissive: glow,
        emissiveIntensity: 0.35,
        metalness: 0.8,
        roughness: 0.25,
      }),
      baseboard: new THREE.MeshStandardMaterial({
        color: '#0d1528',
        emissive: glow,
        emissiveIntensity: 0.15,
        metalness: 0.7,
        roughness: 0.3,
      }),
    }
  }, [accent])
}

function WallPanelStrip({
  width,
  height,
  material,
  x,
  y,
  z,
  rotY = 0,
}: {
  width: number
  height: number
  material: THREE.MeshStandardMaterial
  x: number
  y: number
  z: number
  rotY?: number
}) {
  const cols = Math.max(2, Math.round(width / 1.4))
  const rows = Math.max(2, Math.round(height / 1.1))
  const panelW = width / cols
  const panelH = height / rows

  return (
    <group position={[x, y, z]} rotation={[0, rotY, 0]}>
      {Array.from({ length: cols }, (_, c) =>
        Array.from({ length: rows }, (_, r) => (
          <mesh
            key={`${c}-${r}`}
            position={[
              -width / 2 + panelW / 2 + c * panelW,
              -height / 2 + panelH / 2 + r * panelH,
              0,
            ]}
          >
            <planeGeometry args={[panelW * 0.94, panelH * 0.94]} />
            <meshStandardMaterial
              color="#151f35"
              metalness={0.55}
              roughness={0.48}
              emissive="#0a1428"
              emissiveIntensity={0.08}
            />
          </mesh>
        )),
      )}
      <mesh>
        <planeGeometry args={[width, height]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

/** Enclosed cyberpunk room — floor, walls, ceiling, trim, door frame */
export function InteriorRoomShell({ accent }: { accent: string }) {
  const mats = useRoomMaterials(accent)
  const hw = ROOM.width / 2
  const hd = ROOM.depth / 2
  const backZ = -hd + ROOM.wall / 2
  const frontZ = hd - ROOM.wall / 2

  return (
    <group>
      {/* Floor slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <primitive object={mats.floor} attach="material" />
      </mesh>
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[ROOM.width, 0.08, ROOM.depth]} />
        <primitive object={mats.floor} attach="material" />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, ROOM.height / 2, backZ]} castShadow receiveShadow>
        <boxGeometry args={[ROOM.width, ROOM.height, ROOM.wall]} />
        <primitive object={mats.wall} attach="material" />
      </mesh>
      <WallPanelStrip
        width={ROOM.width - 0.4}
        height={ROOM.height - 0.5}
        material={mats.wall}
        x={0}
        y={ROOM.height / 2}
        z={backZ + ROOM.wall / 2 + 0.01}
      />

      {/* Left wall */}
      <mesh position={[-hw + ROOM.wall / 2, ROOM.height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[ROOM.wall, ROOM.height, ROOM.depth]} />
        <primitive object={mats.wall} attach="material" />
      </mesh>
      <WallPanelStrip
        width={ROOM.depth - 0.4}
        height={ROOM.height - 0.5}
        material={mats.wall}
        x={-hw + ROOM.wall / 2 + 0.01}
        y={ROOM.height / 2}
        z={0}
        rotY={Math.PI / 2}
      />

      {/* Right wall */}
      <mesh position={[hw - ROOM.wall / 2, ROOM.height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[ROOM.wall, ROOM.height, ROOM.depth]} />
        <primitive object={mats.wall} attach="material" />
      </mesh>
      <WallPanelStrip
        width={ROOM.depth - 0.4}
        height={ROOM.height - 0.5}
        material={mats.wall}
        x={hw - ROOM.wall / 2 - 0.01}
        y={ROOM.height / 2}
        z={0}
        rotY={-Math.PI / 2}
      />

      {/* Front wall with door opening */}
      <group position={[0, ROOM.height / 2, frontZ]}>
        <mesh position={[-hw / 2 - 0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[hw - 0.5, ROOM.height, ROOM.wall]} />
          <primitive object={mats.wall} attach="material" />
        </mesh>
        <mesh position={[hw / 2 + 0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[hw - 0.5, ROOM.height, ROOM.wall]} />
          <primitive object={mats.wall} attach="material" />
        </mesh>
        <mesh position={[0, ROOM.height / 2 - 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.1, ROOM.wall]} />
          <primitive object={mats.wall} attach="material" />
        </mesh>
      </group>

      {/* Ceiling */}
      <mesh position={[0, ROOM.height, 0]} receiveShadow>
        <boxGeometry args={[ROOM.width, 0.1, ROOM.depth]} />
        <primitive object={mats.ceiling} attach="material" />
      </mesh>

      {/* Ceiling light strips */}
      {[-2.2, 0, 2.2].map((z) => (
        <mesh key={z} position={[0, ROOM.height - 0.06, z]}>
          <boxGeometry args={[ROOM.width - 1.2, 0.04, 0.18]} />
          <meshStandardMaterial
            color="#1a3060"
            emissive={accent}
            emissiveIntensity={0.55}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Baseboard neon trim */}
      {[
        [0, 0.06, backZ + 0.2, ROOM.width - 0.2, 0.04, 0.04],
        [0, 0.06, frontZ - 0.2, ROOM.width - 0.2, 0.04, 0.04],
        [-hw + 0.2, 0.06, 0, 0.04, 0.04, ROOM.depth - 0.2],
        [hw - 0.2, 0.06, 0, 0.04, 0.04, ROOM.depth - 0.2],
      ].map((args, i) => (
        <mesh key={i} position={[args[0], args[1], args[2]] as [number, number, number]}>
          <boxGeometry args={[args[3], args[4], args[5]] as [number, number, number]} />
          <primitive object={mats.baseboard} attach="material" />
        </mesh>
      ))}

      {/* Door frame at entrance */}
      <group position={[0, 1.35, frontZ]}>
        <mesh position={[-1.15, 0, 0]}>
          <boxGeometry args={[0.08, 2.7, 0.12]} />
          <primitive object={mats.trim} attach="material" />
        </mesh>
        <mesh position={[1.15, 0, 0]}>
          <boxGeometry args={[0.08, 2.7, 0.12]} />
          <primitive object={mats.trim} attach="material" />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[2.38, 0.08, 0.12]} />
          <primitive object={mats.trim} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

export const INTERIOR_ROOM_BOUNDS = ROOM
