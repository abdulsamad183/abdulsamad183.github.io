import { SceneRenderer } from './SceneRenderer'

export function CityScene() {
  return (
    <>
      <color attach="background" args={['#b8d9f5']} />
      <fog attach="fog" args={['#d4e8f7', 25, 90]} />

      <ambientLight intensity={0.65} color="#ffffff" />
      <hemisphereLight args={['#87ceeb', '#e8f0e0', 0.85]} />
      <directionalLight position={[12, 28, 10]} intensity={1.1} color="#fff8e8" castShadow />

      {/* City plaza ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#e2ebe0" roughness={0.92} metalness={0.02} />
      </mesh>

      {/* Roads / paths */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[6, 50]} />
        <meshStandardMaterial color="#d8dce0" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[50, 6]} />
        <meshStandardMaterial color="#d8dce0" roughness={0.95} />
      </mesh>

      <SceneRenderer />
    </>
  )
}
