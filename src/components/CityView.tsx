import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EntryScene } from './entry/EntryScene'
import { InteriorScene } from './scene/interior/InteriorScene'
import { CameraController } from './scene/CameraController'
import { EntryHUD } from './ui/EntryHUD'
import { ContentPanel } from './ContentPanel'
import { InteractionPrompt } from './InteractionPrompt'
import { PANEL_DISTRICTS } from '../constants/districtCameras'
import type { DistrictId } from '../types/city'
import { useCityStore } from '../store/cityStore'
import { AssetManager } from '../engine/AssetManager'
import { PropAssetManager } from '../effects/CityProp'
import { ENTRY_CAMERA } from '../config/cityLayout'
import { CameraManager } from '../engine/CameraManager'

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial color="#00e5ff" wireframe />
    </mesh>
  )
}

export function CityView() {
  const toggleMap = useCityStore((s) => s.toggleMap)
  const enterInterior = useCityStore((s) => s.enterInterior)
  const exitInterior = useCityStore((s) => s.exitInterior)
  const goToOverview = useCityStore((s) => s.goToOverview)
  const closePanel = useCityStore((s) => s.closePanel)
  const panelContent = useCityStore((s) => s.panelContent)
  const viewMode = useCityStore((s) => s.viewMode)
  const cityView = useCityStore((s) => s.cityView)
  const interiorDistrictId = useCityStore((s) => s.interiorDistrictId)
  const setMapOpen = useCityStore((s) => s.setMapOpen)
  const mapOpen = useCityStore((s) => s.mapOpen)

  useEffect(() => {
    AssetManager.preloadAll()
    PropAssetManager.preloadAll()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        if (!panelContent && viewMode === 'city') toggleMap()
      }
      if ((e.key === 'e' || e.key === 'E') && !panelContent && viewMode === 'city' && cityView === 'building') {
        const districtId = useCityStore.getState().activeDistrictId as DistrictId
        if (PANEL_DISTRICTS.includes(districtId)) {
          enterInterior(districtId)
        }
      }
      if (e.key === 'Escape') {
        if (panelContent) closePanel()
        else if (viewMode === 'interior') exitInterior()
        else if (cityView === 'building') goToOverview()
        else if (mapOpen) setMapOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [
    toggleMap,
    enterInterior,
    exitInterior,
    goToOverview,
    closePanel,
    panelContent,
    viewMode,
    cityView,
    mapOpen,
    setMapOpen,
  ])

  return (
    <div className="relative h-full w-full bg-city-bg">
      <Canvas
        shadows
        camera={{ position: ENTRY_CAMERA.position, fov: ENTRY_CAMERA.fov, near: 0.1, far: 150 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#060a14' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={<SceneLoader />}>
          {viewMode === 'city' ? <EntryScene /> : null}
          {viewMode === 'interior' && interiorDistrictId ? (
            <InteriorScene districtId={interiorDistrictId} />
          ) : null}
          {viewMode === 'city' && cityView === 'overview' ? <CameraManager /> : null}
          {viewMode === 'interior' || cityView === 'building' ? <CameraController /> : null}
        </Suspense>
      </Canvas>

      <EntryHUD />
      <div className="cyber-vignette pointer-events-none fixed inset-0 z-20" />
      <InteractionPrompt />
      <ContentPanel />
    </div>
  )
}
