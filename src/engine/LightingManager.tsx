export function LightingManager() {
  return (
    <>
      <color attach="background" args={['#060a14']} />
      <ambientLight intensity={0.15} color="#1a2040" />
      <hemisphereLight args={['#1a3060', '#060a14', 0.5]} />
      <directionalLight position={[-20, 30, 15]} intensity={0.35} color="#6688cc" castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[0, 12, 0]} intensity={2.5} color="#00e5ff" distance={45} decay={2} />
      <pointLight position={[-15, 8, -10]} intensity={1.2} color="#b026ff" distance={35} decay={2} />
      <pointLight position={[15, 8, 10]} intensity={1.2} color="#ff2079" distance={35} decay={2} />
      <spotLight position={[0, 40, 0]} angle={0.5} penumbra={0.8} intensity={0.4} color="#00e5ff" distance={80} />
    </>
  )
}
