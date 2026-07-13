/** Atmospheric haze layers — not asset geometry */
export function SmogHaze() {
  return (
    <group>
      <mesh position={[0, 3, -15]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[60, 8]} />
        <meshBasicMaterial color="#1a0830" transparent opacity={0.25} depthWrite={false} />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <planeGeometry args={[80, 40]} />
        <meshBasicMaterial color="#0d0520" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  )
}
