import { useMemo, useLayoutEffect, useRef, type ComponentProps } from 'react'
import * as THREE from 'three'
import type { Group } from 'three'
import type { AssetId, Vec3 } from '../../types/scene'
import { useAsset } from '../../assets/AssetManager'

export interface CityAssetProps extends Omit<ComponentProps<'group'>, 'scale'> {
  asset: AssetId
  position?: Vec3
  rotation?: Vec3
  scale?: number | Vec3
  groundAlign?: boolean
}

/**
 * Generic GLTF instancer — all city geometry flows through this component.
 */
export function CityAsset({
  asset,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale,
  groundAlign = true,
  ...groupProps
}: CityAssetProps) {
  const { scene } = useAsset(asset)
  const groupRef = useRef<Group>(null)

  const clone = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return c
  }, [scene])

  useLayoutEffect(() => {
    if (!groundAlign) return
    const box = new THREE.Box3().setFromObject(clone)
    if (Number.isFinite(box.min.y)) {
      clone.position.y = -box.min.y
    }
  }, [clone, groundAlign])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale} {...groupProps}>
      <primitive object={clone} />
    </group>
  )
}
