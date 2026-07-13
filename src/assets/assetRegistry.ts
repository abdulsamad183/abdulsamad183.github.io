import type { AssetId } from '../types/scene'

const BASE = '/assets/models'

/**
 * Semantic asset paths — Kenney City Kit (Commercial) CC0.
 * Replace any .glb with a higher-quality model using the same filename.
 */
export const ASSET_REGISTRY: Record<AssetId, string> = {
  'building-city-core': `${BASE}/building-city-core.glb`,
  'building-projects': `${BASE}/building-projects.glb`,
  'building-publications': `${BASE}/building-publications.glb`,
  'building-experience': `${BASE}/building-experience.glb`,
  'building-education': `${BASE}/building-education.glb`,
  'building-resume': `${BASE}/building-resume.glb`,
  'building-contact': `${BASE}/building-contact.glb`,
  'building-skyline-a': `${BASE}/building-skyline-a.glb`,
  'building-skyline-b': `${BASE}/building-skyline-b.glb`,
  'building-skyline-c': `${BASE}/building-skyline-c.glb`,
  'building-skyline-d': `${BASE}/building-skyline-d.glb`,
  'building-skyline-e': `${BASE}/building-skyline-e.glb`,
  'building-skyline-f': `${BASE}/building-skyline-f.glb`,
  'building-skyline-g': `${BASE}/building-skyline-g.glb`,
  'building-skyline-h': `${BASE}/building-skyline-h.glb`,
  'prop-parasol': `${BASE}/prop-parasol.glb`,
  'prop-awning': `${BASE}/prop-awning.glb`,
}

export const ALL_ASSET_IDS = Object.keys(ASSET_REGISTRY) as AssetId[]

export function getAssetPath(id: AssetId): string {
  return ASSET_REGISTRY[id]
}
