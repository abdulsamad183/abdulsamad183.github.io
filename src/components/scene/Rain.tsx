import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RAIN_COUNT = 1200
const AREA = 50
const HEIGHT = 30

export function Rain() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const drops = useMemo(() => {
    return Array.from({ length: RAIN_COUNT }, () => ({
      x: (Math.random() - 0.5) * AREA,
      y: Math.random() * HEIGHT,
      z: (Math.random() - 0.5) * AREA,
      speed: 0.12 + Math.random() * 0.18,
      scaleY: 0.3 + Math.random() * 0.25,
    }))
  }, [])

  useFrame(() => {
    if (!meshRef.current) return

    drops.forEach((drop, i) => {
      drop.y -= drop.speed
      if (drop.y < 0) {
        drop.y = HEIGHT
        drop.x = (Math.random() - 0.5) * AREA
        drop.z = (Math.random() - 0.5) * AREA
      }
      dummy.position.set(drop.x, drop.y, drop.z)
      dummy.scale.set(0.02, drop.scaleY, 0.02)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, RAIN_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#a8d8ff" transparent opacity={0.4} />
    </instancedMesh>
  )
}
