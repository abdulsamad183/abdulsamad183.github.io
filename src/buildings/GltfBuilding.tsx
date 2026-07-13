import { useMemo, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import type { Group } from 'three'
import { useBuildingAsset } from '../engine/AssetManager'
import type { BuildingAssetId } from '../config/assets'

interface GltfBuildingProps {
  asset: BuildingAssetId
  emissive: string
  emissiveIntensity: number
  scale?: number
  groundAlign?: boolean
}

/** Instantiates a production GLB — never constructs building geometry in code */
export function GltfBuilding({
  asset,
  emissive,
  emissiveIntensity,
  scale = 1,
  groundAlign = true,
}: GltfBuildingProps) {
  const groupRef = useRef<Group>(null)
  const { scene } = useBuildingAsset(asset)

  const clone = useMemo(() => {
    const c = scene.clone(true)
    const color = new THREE.Color(emissive)
    c.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat) => {
          if (mat && 'metalness' in mat) {
            const m = mat as THREE.MeshStandardMaterial
            m.metalness = Math.max(m.metalness, 0.4)
            m.roughness = Math.min(m.roughness, 0.55)
            m.envMapIntensity = 1.4
            const lum = m.color.r * 0.299 + m.color.g * 0.587 + m.color.b * 0.114
            if (lum < 0.45) {
              m.emissive = color
              m.emissiveIntensity = Math.max(emissiveIntensity * 0.5, 0.15)
            }
            // Keep windows / emissive parts bright
            if (m.emissiveIntensity > 0 || lum > 0.5) {
              m.emissiveIntensity = Math.max(m.emissiveIntensity, emissiveIntensity * 0.35)
            }
          }
        })
      }
    })
    return c
  }, [scene, emissive, emissiveIntensity])

  useLayoutEffect(() => {
    if (!groundAlign || !groupRef.current) return
    const box = new THREE.Box3().setFromObject(groupRef.current)
    if (Number.isFinite(box.min.y)) {
      groupRef.current.position.y = -box.min.y
    }
  }, [clone, scale, groundAlign])

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={clone} />
    </group>
  )
}
