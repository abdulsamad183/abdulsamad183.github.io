import { useMemo, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { ALL_PROP_ASSETS, PROP_ASSETS, type PropAssetId } from '../config/props'

export class PropAssetManager {
  private static preloaded = false

  static preloadAll(): void {
    if (PropAssetManager.preloaded) return
    ALL_PROP_ASSETS.forEach((id) => useGLTF.preload(PROP_ASSETS[id]))
    PropAssetManager.preloaded = true
  }
}

export function usePropAsset(id: PropAssetId) {
  return useGLTF(PROP_ASSETS[id])
}

interface CityPropProps {
  asset: PropAssetId
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  emissive?: string
}

export function CityProp({ asset, position, rotation = [0, 0, 0], scale = 1, emissive = '#00e5ff' }: CityPropProps) {
  const { scene } = usePropAsset(asset)
  const isLight = asset.startsWith('light_')
  const isDrone = asset === 'drone'

  const clone = useMemo(() => {
    const c = scene.clone(true)
    const glow = new THREE.Color(emissive)
    c.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = !isDrone
        child.receiveShadow = true
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat) => {
          if (mat && 'metalness' in mat) {
            const m = mat as THREE.MeshStandardMaterial
            m.metalness = Math.max(m.metalness, 0.6)
            m.roughness = Math.min(m.roughness, 0.35)
            if (isLight) {
              m.emissive = glow
              m.emissiveIntensity = 0.9
            }
          }
        })
      }
    })
    return c
  }, [scene, emissive, isLight, isDrone])

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(clone)
    if (Number.isFinite(box.min.y)) clone.position.y = -box.min.y
  }, [clone])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={clone} />
      {isLight && <pointLight position={[0, 2.5, 0]} intensity={0.5} color={emissive} distance={8} decay={2} />}
    </group>
  )
}
