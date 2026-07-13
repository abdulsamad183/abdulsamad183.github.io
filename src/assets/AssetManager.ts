import { useGLTF } from '@react-three/drei'
import { ALL_ASSET_IDS, getAssetPath } from './assetRegistry'
import type { AssetId } from '../types/scene'

/**
 * Central asset loader — preloads and caches all GLTF models via drei's useGLTF cache.
 * Call preloadAllAssets() before the city scene mounts.
 */
export class AssetManager {
  private static preloaded = false

  static preloadAll(): void {
    if (AssetManager.preloaded) return
    ALL_ASSET_IDS.forEach((id) => {
      useGLTF.preload(getAssetPath(id))
    })
    AssetManager.preloaded = true
  }

  static preload(id: AssetId): void {
    useGLTF.preload(getAssetPath(id))
  }

  static getPath(id: AssetId): string {
    return getAssetPath(id)
  }

  static isPreloaded(): boolean {
    return AssetManager.preloaded
  }
}

/** React hook — ensures asset is in drei cache */
export function useAsset(id: AssetId) {
  return useGLTF(getAssetPath(id))
}
