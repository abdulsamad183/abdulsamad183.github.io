import { Environment } from '@react-three/drei'
import { Rain } from '../components/scene/Rain'

/** Wet asphalt + radial neon roads — environment layer, not buildings */
export function CityGround() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[75, 64]} />
        <meshStandardMaterial color="#0a0e18" metalness={0.95} roughness={0.08} envMapIntensity={1.5} />
      </mesh>

      {/* Central plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[8, 48]} />
        <meshStandardMaterial color="#0d1528" emissive="#00b8d4" emissiveIntensity={0.12} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Radial neon roads */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, angle]}
            position={[Math.cos(angle) * 10, 0.02, Math.sin(angle) * 10]}
          >
            <planeGeometry args={[3, 40]} />
            <meshStandardMaterial color="#0a1020" emissive="#00e5ff" emissiveIntensity={0.35} metalness={0.8} roughness={0.1} transparent opacity={0.9} />
          </mesh>
        )
      })}

      {/* Ring road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[14, 14.4, 64]} />
        <meshBasicMaterial color="#b026ff" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[20, 20.3, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

export function CityEnvironment() {
  return (
    <>
      <Environment preset="night" />
      <CityGround />
      <Rain />
      <fog attach="fog" args={['#0a0e1a', 18, 65]} />
    </>
  )
}
