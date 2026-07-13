import type { InteriorPropType } from './interiorContent'

export type InteriorAssetId =
  | 'computer'
  | 'computer_large'
  | 'tv_1'
  | 'tv_2'
  | 'tv_3'
  | 'lootbox'
  | 'collectible_board'
  | 'tank'
  | 'sign_small_1'
  | 'sign_small_2'
  | 'hologram_pod'
  | 'ac_unit'
  | 'ac_side'
  | 'light_street'
  | 'floor_platform'
  | 'wall_panel'

const BASE = '/assets/interior'

export const INTERIOR_ASSETS: Record<InteriorAssetId, string> = {
  computer: `${BASE}/computer.glb`,
  computer_large: `${BASE}/computer_large.glb`,
  tv_1: `${BASE}/tv_1.glb`,
  tv_2: `${BASE}/tv_2.glb`,
  tv_3: `${BASE}/tv_3.glb`,
  lootbox: `${BASE}/lootbox.glb`,
  collectible_board: `${BASE}/collectible_board.glb`,
  tank: `${BASE}/tank.glb`,
  sign_small_1: `${BASE}/sign_small_1.glb`,
  sign_small_2: `${BASE}/sign_small_2.glb`,
  hologram_pod: `${BASE}/hologram_pod.glb`,
  ac_unit: `${BASE}/ac_unit.glb`,
  ac_side: `${BASE}/ac_side.glb`,
  light_street: `${BASE}/light_street.glb`,
  floor_platform: `${BASE}/floor_platform.glb`,
  wall_panel: `${BASE}/wall_panel.glb`,
}

export const INTERIOR_PROP_ASSET: Record<InteriorPropType, InteriorAssetId> = {
  monitor: 'computer',
  terminal: 'computer_large',
  crate: 'tank',
  bookshelf: 'tv_2',
  book: 'collectible_board',
  frame: 'sign_small_1',
  diploma: 'sign_small_2',
  folder: 'lootbox',
  hologram: 'hologram_pod',
}

export const INTERIOR_PROP_SCALE: Record<InteriorPropType, number> = {
  monitor: 0.85,
  terminal: 0.8,
  crate: 0.75,
  bookshelf: 0.9,
  book: 0.55,
  frame: 0.7,
  diploma: 0.7,
  folder: 0.65,
  hologram: 0.8,
}

export const ALL_INTERIOR_ASSETS = Object.keys(INTERIOR_ASSETS) as InteriorAssetId[]
