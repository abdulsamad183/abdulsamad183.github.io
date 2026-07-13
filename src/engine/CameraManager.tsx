import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { useCityStore } from '../store/cityStore'
import { DistrictManager } from './DistrictManager'
import { ENTRY_CAMERA } from '../config/cityLayout'

const LERP = 1.8

export function CameraManager() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()

  const cameraTarget = useCityStore((s) => s.camera)
  const isTransitioning = useCityStore((s) => s.isTransitioning)
  const cityView = useCityStore((s) => s.cityView)
  const viewMode = useCityStore((s) => s.viewMode)
  const hoveredDistrictId = useCityStore((s) => s.hoveredDistrictId)
  const panelOpen = useCityStore((s) => s.panelContent !== null)

  const desiredPos = useRef(new THREE.Vector3(...cameraTarget.position))
  const desiredTarget = useRef(new THREE.Vector3(...cameraTarget.target))

  useEffect(() => {
    desiredPos.current.set(...cameraTarget.position)
    desiredTarget.current.set(...cameraTarget.target)
  }, [cameraTarget])

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = cityView === 'overview' && viewMode === 'city' ? ENTRY_CAMERA.fov : 50
      camera.updateProjectionMatrix()
    }
  }, [camera, cityView, viewMode])

  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    let target = desiredTarget.current.clone()

    if (cityView === 'overview' && hoveredDistrictId && viewMode === 'city') {
      const district = DistrictManager.getByDistrictId(hoveredDistrictId)
      if (district) {
        target.lerp(new THREE.Vector3(...district.position).multiplyScalar(0.15), 0.08)
        desiredPos.current.lerp(
          new THREE.Vector3(ENTRY_CAMERA.position[0] * 0.94, ENTRY_CAMERA.position[1] * 0.96, ENTRY_CAMERA.position[2] * 0.94),
          0.05,
        )
      }
    }

    const t = Math.min(1, delta * (isTransitioning ? LERP * 1.5 : LERP))
    camera.position.lerp(desiredPos.current, t)
    controls.target.lerp(target, t)
    controls.update()
  })

  const isOverview = cityView === 'overview' && viewMode === 'city'
  const isInterior = viewMode === 'interior'

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      minDistance={isOverview ? 22 : isInterior ? 0.5 : 12}
      maxDistance={isOverview ? 55 : isInterior ? 5 : 40}
      minPolarAngle={isOverview ? 0.55 : isInterior ? Math.PI / 3.5 : Math.PI / 6}
      maxPolarAngle={isOverview ? 1.05 : isInterior ? Math.PI / 2.05 : Math.PI / 2.15}
      autoRotate={isOverview && !isTransitioning && !panelOpen && !hoveredDistrictId}
      autoRotateSpeed={0.18}
    />
  )
}
