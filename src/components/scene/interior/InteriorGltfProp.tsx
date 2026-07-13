import { useMemo, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import {
  ALL_INTERIOR_ASSETS,
  INTERIOR_ASSETS,
  type InteriorAssetId,
} from '../../../config/interiorAssets'

export class InteriorAssetManager {
  private static preloaded = false

  static preloadAll(): void {
    if (InteriorAssetManager.preloaded) return
    ALL_INTERIOR_ASSETS.forEach((id) => useGLTF.preload(INTERIOR_ASSETS[id]))
    InteriorAssetManager.preloaded = true
  }
}

export function useInteriorAsset(id: InteriorAssetId) {
  return useGLTF(INTERIOR_ASSETS[id])
}

interface InteriorGltfPropProps {
  asset: InteriorAssetId
  scale?: number
  emissive?: string
  emissiveIntensity?: number
  groundAlign?: boolean
}

/** Loads a Quaternius GLB — no procedural geometry */
export function InteriorGltfProp({
  asset,
  scale = 1,
  emissive = '#00e5ff',
  emissiveIntensity = 0.3,
  groundAlign = true,
}: InteriorGltfPropProps) {
  const { scene } = useInteriorAsset(asset)

  const clone = useMemo(() => {
    const c = scene.clone(true)
    const glow = new THREE.Color(emissive)
    c.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat) => {
          if (mat && 'metalness' in mat) {
            const m = mat as THREE.MeshStandardMaterial
            m.metalness = Math.max(m.metalness, 0.5)
            m.roughness = Math.min(m.roughness, 0.45)
            const lum = m.color.r * 0.299 + m.color.g * 0.587 + m.color.b * 0.114
            if (lum < 0.4) {
              m.emissive = glow
              m.emissiveIntensity = emissiveIntensity
            }
          }
        })
      }
    })
    return c
  }, [scene, emissive, emissiveIntensity])

  useLayoutEffect(() => {
    if (!groundAlign) return
    const box = new THREE.Box3().setFromObject(clone)
    if (Number.isFinite(box.min.y)) clone.position.y = -box.min.y
  }, [clone, groundAlign])

  return <primitive object={clone} scale={scale} />
}
