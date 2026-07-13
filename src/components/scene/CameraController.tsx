import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { useCityStore } from '../../store/cityStore'

const LERP_SPEED = 2.2

export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()

  const cameraTarget = useCityStore((s) => s.camera)
  const isTransitioning = useCityStore((s) => s.isTransitioning)
  const viewMode = useCityStore((s) => s.viewMode)
  const cityView = useCityStore((s) => s.cityView)
  const panelOpen = useCityStore((s) => s.panelContent !== null)

  const desiredPos = useRef(new THREE.Vector3(...cameraTarget.position))
  const desiredTarget = useRef(new THREE.Vector3(...cameraTarget.target))

  useEffect(() => {
    desiredPos.current.set(...cameraTarget.position)
    desiredTarget.current.set(...cameraTarget.target)
  }, [cameraTarget])

  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    const t = Math.min(1, delta * (isTransitioning ? LERP_SPEED * 1.4 : LERP_SPEED))
    camera.position.lerp(desiredPos.current, t)
    controls.target.lerp(desiredTarget.current, t)
    controls.update()
  })

  const isInterior = viewMode === 'interior'
  const isOverview = cityView === 'overview' && !isInterior

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      minDistance={isOverview ? 30 : isInterior ? 0.5 : 8}
      maxDistance={isOverview ? 60 : isInterior ? 5 : 24}
      minPolarAngle={isOverview ? 0.55 : isInterior ? Math.PI / 3.5 : Math.PI / 5}
      maxPolarAngle={isOverview ? 1.05 : isInterior ? Math.PI / 2.05 : Math.PI / 2.1}
      autoRotate={!isTransitioning && !panelOpen && isOverview}
      autoRotateSpeed={0.18}
    />
  )
}
