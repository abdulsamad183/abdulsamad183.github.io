import type { DistrictId } from '../types/city'
import type { PanelContent } from '../types/city'

export type InteriorPropType =
  | 'monitor'
  | 'bookshelf'
  | 'book'
  | 'frame'
  | 'diploma'
  | 'folder'
  | 'terminal'
  | 'crate'
  | 'hologram'

export interface InteriorItemConfig {
  id: string
  label: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  prop: InteriorPropType
  panel: PanelContent
}

export interface InteriorRoomConfig {
  districtId: DistrictId
  title: string
  subtitle: string
  accent: string
  items: InteriorItemConfig[]
}

/** Item positions are aligned to desk tops (y≈0.72), shelves, and back wall (z≈-3.1) */
export const INTERIOR_ROOMS: Record<Exclude<DistrictId, 'city-core'>, InteriorRoomConfig> = {
  projects: {
    districtId: 'projects',
    title: 'Projects Loft',
    subtitle: 'Dev workspace — click a station',
    accent: '#b026ff',
    items: [
      {
        id: 'gitsight-desk',
        label: 'GitSight',
        position: [-2, 0.72, -1.8],
        prop: 'monitor',
        panel: { kind: 'project', id: 'gitsight' },
      },
      {
        id: 'yesbroker-desk',
        label: 'YesBroker',
        position: [2, 0.72, -1.8],
        prop: 'monitor',
        panel: { kind: 'project', id: 'yesbroker' },
      },
      {
        id: 'thesis-pod',
        label: 'Thesis',
        position: [0, 0.72, -2.35],
        prop: 'hologram',
        panel: { kind: 'project', id: 'thesis' },
      },
      {
        id: 'lab-ai-playground',
        label: 'AI Playground',
        position: [-2.4, 0.92, 0.8],
        prop: 'crate',
        panel: { kind: 'lab-station', id: 'ai-playground' },
      },
      {
        id: 'lab-side-projects',
        label: 'Side Projects',
        position: [-0.8, 0.92, 0.8],
        prop: 'crate',
        panel: { kind: 'lab-station', id: 'side-projects' },
      },
      {
        id: 'lab-experiments',
        label: 'Experiments',
        position: [0.8, 0.92, 0.8],
        prop: 'crate',
        panel: { kind: 'lab-station', id: 'experiments' },
      },
      {
        id: 'lab-demo-zone',
        label: 'Demo Zone',
        position: [2.4, 0.92, 0.8],
        prop: 'crate',
        panel: { kind: 'lab-station', id: 'demo-zone' },
      },
    ],
  },
  publications: {
    districtId: 'publications',
    title: 'Research Library',
    subtitle: 'Click a volume on the shelf',
    accent: '#00e5ff',
    items: [
      {
        id: 'pub-ieee',
        label: 'IEEE InCIT Paper',
        position: [-0.7, 1.2, -3.0],
        prop: 'book',
        panel: { kind: 'publication', id: 'pub-0' },
      },
      {
        id: 'pub-arxiv',
        label: 'arXiv Preprint',
        position: [0.2, 0.6, -3.0],
        prop: 'book',
        panel: { kind: 'publication', id: 'pub-1' },
      },
      {
        id: 'pub-thesis',
        label: 'Thesis Volume',
        position: [0.9, 1.8, -3.0],
        prop: 'book',
        panel: { kind: 'project', id: 'thesis' },
      },
    ],
  },
  experience: {
    districtId: 'experience',
    title: 'Career Gallery',
    subtitle: 'Framed milestones on the wall',
    accent: '#39ff14',
    items: [
      {
        id: 'exp-infobell',
        label: 'Infobell IT',
        position: [-2.2, 1.55, -3.12],
        rotation: [0, 0, 0],
        prop: 'frame',
        panel: { kind: 'experience', id: 'infobell' },
      },
      {
        id: 'exp-siemens',
        label: 'Siemens',
        position: [0, 1.55, -3.12],
        prop: 'frame',
        panel: { kind: 'experience', id: 'siemens' },
      },
      {
        id: 'exp-rlhf',
        label: 'RLHF Freelance',
        position: [2.2, 1.55, -3.12],
        prop: 'frame',
        panel: { kind: 'experience', id: 'rlhf' },
      },
      {
        id: 'exp-timeline',
        label: 'Full Timeline',
        position: [0, 0.72, 0.2],
        prop: 'terminal',
        panel: { kind: 'experience', id: 'timeline' },
      },
    ],
  },
  education: {
    districtId: 'education',
    title: 'Study Hall',
    subtitle: 'Explore certificates and skills',
    accent: '#ffb703',
    items: [
      {
        id: 'edu-degrees',
        label: 'Degrees',
        position: [-2.2, 1.65, -3.12],
        prop: 'diploma',
        panel: { kind: 'education', section: 'degrees' },
      },
      {
        id: 'edu-certs',
        label: 'Certifications',
        position: [0.2, 1.15, -3.0],
        prop: 'bookshelf',
        panel: { kind: 'education', section: 'certifications' },
      },
      {
        id: 'edu-skills',
        label: 'Skill Tree',
        position: [2.2, 0.72, -1.4],
        prop: 'terminal',
        panel: { kind: 'education', section: 'skills' },
      },
      {
        id: 'edu-roles',
        label: 'Academic Roles',
        position: [-1.8, 0.72, 0.5],
        prop: 'frame',
        panel: { kind: 'education', section: 'roles' },
      },
    ],
  },
  resume: {
    districtId: 'resume',
    title: 'Document Vault',
    subtitle: 'Pick a folder from the cabinet',
    accent: '#00e5ff',
    items: [
      {
        id: 'resume-genai',
        label: 'GenAI CV',
        position: [-0.7, 0.92, -2.2],
        prop: 'folder',
        panel: { kind: 'resume', id: 'genai' },
      },
      {
        id: 'resume-aiml',
        label: 'AIML Resume',
        position: [0.7, 0.92, -2.2],
        prop: 'folder',
        panel: { kind: 'resume', id: 'aiml' },
      },
    ],
  },
  contact: {
    districtId: 'contact',
    title: 'Transmission Desk',
    subtitle: 'Open the comms terminal',
    accent: '#ff2079',
    items: [
      {
        id: 'contact-desk',
        label: 'Send Message',
        position: [0, 0.72, -1.6],
        prop: 'terminal',
        panel: { kind: 'contact' },
      },
    ],
  },
}
