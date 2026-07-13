import type { DistrictId } from '../types/city'
import { DISTRICT_BUILDINGS } from '../config/cityLayout'

export interface DistrictCameraConfig {
  id: DistrictId
  position: [number, number, number]
  target: [number, number, number]
  buildingPosition: [number, number, number]
  color: string
  label: string
}

function layoutPos(id: DistrictId): [number, number, number] {
  const d = DISTRICT_BUILDINGS.find((b) => b.districtId === id)
  return d ? d.position : [0, 0, 0]
}

export const DISTRICT_CAMERAS: Record<DistrictId, DistrictCameraConfig> = {
  'city-core': {
    id: 'city-core',
    position: [10, 14, 14],
    target: [0, 5, 0],
    buildingPosition: layoutPos('city-core'),
    color: '#00e5ff',
    label: 'City Core',
  },
  projects: {
    id: 'projects',
    position: [-18, 10, -4],
    target: [-13, 3, -11],
    buildingPosition: layoutPos('projects'),
    color: '#b026ff',
    label: 'Projects',
  },
  publications: {
    id: 'publications',
    position: [18, 10, -4],
    target: [13, 3, -11],
    buildingPosition: layoutPos('publications'),
    color: '#00e5ff',
    label: 'Publications',
  },
  experience: {
    id: 'experience',
    position: [-18, 10, 16],
    target: [-12, 3, 10],
    buildingPosition: layoutPos('experience'),
    color: '#39ff14',
    label: 'Experience',
  },
  education: {
    id: 'education',
    position: [0, 10, 24],
    target: [0, 3, 16],
    buildingPosition: layoutPos('education'),
    color: '#ffb703',
    label: 'Education',
  },
  resume: {
    id: 'resume',
    position: [22, 10, 4],
    target: [14, 3, 0],
    buildingPosition: layoutPos('resume'),
    color: '#00e5ff',
    label: 'Resume',
  },
  contact: {
    id: 'contact',
    position: [20, 10, 20],
    target: [12, 3, 12],
    buildingPosition: layoutPos('contact'),
    color: '#ff2079',
    label: 'Contact',
  },
}

export const EXPLORABLE_DISTRICTS: DistrictId[] = [
  'city-core',
  'projects',
  'publications',
  'experience',
  'education',
  'resume',
  'contact',
]

export const PANEL_DISTRICTS: DistrictId[] = [
  'projects',
  'publications',
  'experience',
  'education',
  'resume',
  'contact',
]

export const DISTRICT_ACCENT: Partial<Record<DistrictId, { text: string; border: string }>> = {
  projects: { text: 'text-city-purple', border: 'border-city-purple/50' },
  publications: { text: 'text-city-cyan', border: 'border-city-cyan/50' },
  experience: { text: 'text-city-green', border: 'border-city-green/50' },
  education: { text: 'text-city-amber', border: 'border-city-amber/50' },
  resume: { text: 'text-city-cyan', border: 'border-city-cyan/50' },
  contact: { text: 'text-city-magenta', border: 'border-city-magenta/50' },
}

export { ENTRY_CAMERA as OVERVIEW_CAMERA } from '../config/cityLayout'
