import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Points } from 'three'
import * as THREE from 'three'

/** Floating atmospheric particles */
export function AnimationManager() {
  const ref = useRef<Points>(null)
  const count = 400
  const positions = useRef(new Float32Array(count * 3))

  for (let i = 0; i < count; i++) {
    positions.current[i * 3] = (Math.random() - 0.5) * 80
    positions.current[i * 3 + 1] = Math.random() * 25
    positions.current[i * 3 + 2] = (Math.random() - 0.5) * 80
  }

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#00e5ff" transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}
