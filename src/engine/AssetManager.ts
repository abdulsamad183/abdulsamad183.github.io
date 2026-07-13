import { useGLTF } from '@react-three/drei'
import { ALL_BUILDING_ASSETS, BUILDING_ASSETS, type BuildingAssetId } from '../config/assets'

/**
 * Central GLTF cache — all buildings load through here.
 * Replace any file in public/assets/buildings/ to upgrade visuals.
 */
export class AssetManager {
  private static preloaded = false

  static preloadAll(): void {
    if (AssetManager.preloaded) return
    ALL_BUILDING_ASSETS.forEach((id) => {
      useGLTF.preload(BUILDING_ASSETS[id])
    })
    AssetManager.preloaded = true
  }

  static preload(id: BuildingAssetId): void {
    useGLTF.preload(BUILDING_ASSETS[id])
  }

  static getPath(id: BuildingAssetId): string {
    return BUILDING_ASSETS[id]
  }
}

export function useBuildingAsset(id: BuildingAssetId) {
  return useGLTF(BUILDING_ASSETS[id])
}
