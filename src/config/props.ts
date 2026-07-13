export type PropAssetId =
  | 'light_street_1'
  | 'light_street_2'
  | 'pipe_1'
  | 'pipe_corner'
  | 'antenna_1'
  | 'antenna_2'
  | 'rail_long'
  | 'fence'
  | 'platform_tile'
  | 'light_square'
  | 'drone'

const BASE = '/assets/props'

export const PROP_ASSETS: Record<PropAssetId, string> = {
  light_street_1: `${BASE}/light_street_1.glb`,
  light_street_2: `${BASE}/light_street_2.glb`,
  pipe_1: `${BASE}/pipe_1.glb`,
  pipe_corner: `${BASE}/pipe_corner.glb`,
  antenna_1: `${BASE}/antenna_1.glb`,
  antenna_2: `${BASE}/antenna_2.glb`,
  rail_long: `${BASE}/rail_long.glb`,
  fence: `${BASE}/fence.glb`,
  platform_tile: `${BASE}/platform_tile.glb`,
  light_square: `${BASE}/light_square.glb`,
  drone: `${BASE}/drone.glb`,
}

export const ALL_PROP_ASSETS = Object.keys(PROP_ASSETS) as PropAssetId[]

export interface PropPlacement {
  id: string
  asset: PropAssetId
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

/** Scatter props around the radial city */
export const CITY_PROP_SCATTER: PropPlacement[] = [
  // Street lights along ring roads
  ...Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2
    const r = 15
    return {
      id: `light-ring-${i}`,
      asset: i % 2 === 0 ? ('light_street_1' as const) : ('light_street_2' as const),
      position: [Math.cos(a) * r, 0, Math.sin(a) * r] as [number, number, number],
      rotation: [0, -a + Math.PI / 2, 0] as [number, number, number],
      scale: 1.2,
    }
  }),
  // Outer ring lights
  ...Array.from({ length: 16 }).map((_, i) => {
    const a = (i / 16) * Math.PI * 2 + 0.2
    const r = 24
    return {
      id: `light-outer-${i}`,
      asset: 'light_street_1' as const,
      position: [Math.cos(a) * r, 0, Math.sin(a) * r] as [number, number, number],
      rotation: [0, -a + Math.PI / 2, 0] as [number, number, number],
      scale: 1,
    }
  }),
  // Pipes along radial roads
  ...Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2
    return {
      id: `pipe-${i}`,
      asset: 'pipe_1' as const,
      position: [Math.cos(a) * 8, 0, Math.sin(a) * 8] as [number, number, number],
      rotation: [0, a, 0] as [number, number, number],
      scale: 1.5,
    }
  }),
  // Antennas on skyline ring
  { id: 'ant-1', asset: 'antenna_1', position: [-30, 0, -20], scale: 1.5 },
  { id: 'ant-2', asset: 'antenna_2', position: [30, 0, -20], scale: 1.5 },
  { id: 'ant-3', asset: 'antenna_1', position: [-30, 0, 20], rotation: [0, 1.2, 0], scale: 1.3 },
  { id: 'ant-4', asset: 'antenna_2', position: [30, 0, 20], rotation: [0, -0.8, 0], scale: 1.3 },
  // Flying drones
  { id: 'drone-1', asset: 'drone', position: [8, 6, 8], rotation: [0, 0.5, 0], scale: 0.8 },
  { id: 'drone-2', asset: 'drone', position: [-10, 8, 5], rotation: [0, 2, 0], scale: 0.7 },
  { id: 'drone-3', asset: 'drone', position: [5, 7, -12], rotation: [0, -1, 0], scale: 0.75 },
]
