import type { DistrictId } from '../types/city'
import type { BuildingAssetId } from './assets'

export interface DistrictBuildingConfig {
  id: string
  districtId: DistrictId
  asset: BuildingAssetId
  label: string
  subtitle: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale: number
  accent: string
  emissive: string
  hitbox: [number, number, number]
  interactive: boolean
}

export interface SkylineConfig {
  id: string
  asset: BuildingAssetId
  position: [number, number, number]
  scale: number
  rotation?: [number, number, number]
}

/** Circular radial layout — matches reference composition */
export const DISTRICT_BUILDINGS: DistrictBuildingConfig[] = [
  {
    id: 'core',
    districtId: 'city-core',
    asset: 'ai_core_tower',
    label: 'SAMAD CITY',
    subtitle: 'AI CORE',
    position: [0, 0, 0],
    scale: 3.6,
    accent: '#00e5ff',
    emissive: '#00b8d4',
    hitbox: [12, 16, 12],
    interactive: true,
  },
  {
    id: 'projects',
    districtId: 'projects',
    asset: 'projects_hq',
    label: 'PROJECTS',
    subtitle: 'Explore my AI projects',
    position: [-22, 0, -20],
    rotation: [0, 0.4, 0],
    scale: 3.2,
    accent: '#b026ff',
    emissive: '#9d4edd',
    hitbox: [10, 14, 10],
    interactive: true,
  },
  {
    id: 'publications',
    districtId: 'publications',
    asset: 'research_institute',
    label: 'PUBLICATIONS',
    subtitle: 'Research papers & thesis',
    position: [22, 0, -20],
    rotation: [0, -0.4, 0],
    scale: 3.0,
    accent: '#00e5ff',
    emissive: '#0077b6',
    hitbox: [10, 14, 10],
    interactive: true,
  },
  {
    id: 'experience',
    districtId: 'experience',
    asset: 'experience_district',
    label: 'EXPERIENCE',
    subtitle: 'Career & milestones',
    position: [-20, 0, 18],
    rotation: [0, 2.2, 0],
    scale: 3.0,
    accent: '#39ff14',
    emissive: '#2d6a4f',
    hitbox: [10, 13, 10],
    interactive: true,
  },
  {
    id: 'education',
    districtId: 'education',
    asset: 'education_center',
    label: 'EDUCATION',
    subtitle: 'Degrees & certifications',
    position: [0, 0, 26],
    rotation: [0, Math.PI, 0],
    scale: 3.0,
    accent: '#ffb703',
    emissive: '#fb8500',
    hitbox: [10, 14, 10],
    interactive: true,
  },
  {
    id: 'resume',
    districtId: 'resume',
    asset: 'resume_center',
    label: 'RESUME',
    subtitle: 'Download CVs',
    position: [24, 0, 0],
    rotation: [0, -1.2, 0],
    scale: 2.9,
    accent: '#00e5ff',
    emissive: '#0096c7',
    hitbox: [9, 12, 9],
    interactive: true,
  },
  {
    id: 'contact',
    districtId: 'contact',
    asset: 'contact_tower',
    label: 'CONTACT',
    subtitle: 'Get in touch',
    position: [20, 0, 20],
    rotation: [0, -0.8, 0],
    scale: 3.0,
    accent: '#ff2079',
    emissive: '#c9184a',
    hitbox: [10, 14, 10],
    interactive: true,
  },
]

export const SKYLINE_RING: SkylineConfig[] = [
  { id: 's1', asset: 'skyline_g', position: [-38, 0, -30], scale: 3.5 },
  { id: 's2', asset: 'skyline_h', position: [38, 0, -30], scale: 3.6 },
  { id: 's3', asset: 'skyline_a', position: [-42, 0, 0], scale: 4.0 },
  { id: 's4', asset: 'skyline_b', position: [42, 0, 0], scale: 3.5 },
  { id: 's5', asset: 'skyline_c', position: [-36, 0, 30], scale: 4.0 },
  { id: 's6', asset: 'skyline_d', position: [36, 0, 30], scale: 3.4 },
  { id: 's7', asset: 'skyline_e', position: [0, 0, -40], scale: 3.2 },
  { id: 's8', asset: 'skyline_f', position: [-28, 0, -38], scale: 3.8 },
  { id: 's9', asset: 'skyline_g', position: [28, 0, -38], scale: 3.5 },
  { id: 's10', asset: 'skyline_h', position: [-30, 0, 38], scale: 3.4 },
  { id: 's11', asset: 'skyline_a', position: [30, 0, 38], scale: 3.9 },
]

/** Cinematic overview — closer so city fills the viewport */
export const ENTRY_CAMERA = {
  position: [30, 26, 30] as [number, number, number],
  target: [0, 5, 0] as [number, number, number],
  fov: 60,
}
