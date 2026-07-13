export type AppPhase = 'boot' | 'city'

export type ViewMode = 'city' | 'interior'

/** Top-down map vs close-up at a building */
export type CityView = 'overview' | 'building'

export type DistrictId =
  | 'city-core'
  | 'projects'
  | 'publications'
  | 'experience'
  | 'education'
  | 'resume'
  | 'contact'

export type DistrictStatus = 'active' | 'explorable' | 'coming-soon'

export interface ProfileLinks {
  linkedin: string
  github: string
  leetcode: string
  linktree: string
  resumeFolder: string
}

export interface Resume {
  id: string
  label: string
  url: string
}

export interface Profile {
  name: string
  shortName: string
  title: string
  tagline: string
  headline: string
  architect: string
  location: string
  email: string
  funFacts: string[]
  links: ProfileLinks
  resumes: Resume[]
}

export interface District {
  id: DistrictId
  name: string
  shortName: string
  type: string
  description: string
  status: DistrictStatus
  position: [number, number, number]
  tier?: number
}

export interface FlagshipProject {
  id: string
  name: string
  building: string
  description: string
  tech: string[]
  links: Record<string, string>
  features: string[]
}

export interface Experience {
  role: string
  company: string
  period: string
  location: string
  highlights: string[]
  skills: string[]
  projects?: { name: string; highlights: string[] }[]
}

export interface CareerTimelineEntry {
  period: string
  role: string
  company: string
}

export interface Education {
  degree: string
  institution: string
  period: string
  cgpa: string
}

export interface Publication {
  title: string
  authors: string
  venue: string
  url: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface UniversityDoor {
  id: string
  label: string
  description: string
  items: string[]
}

export interface AcademicRole {
  title: string
  period: string
  highlights: string[]
}

export interface SkillNode {
  id: string
  label: string
  category: string
  connections: string[]
  projects?: string[]
}

export interface SideProject {
  id: string
  name: string
  description: string
  tech: string[]
  links: Record<string, string>
  station: string
}

export interface LabStation {
  id: string
  label: string
  description: string
}

export interface TimelineMilestone {
  year: string
  event: string
}

export interface CameraState {
  position: [number, number, number]
  target: [number, number, number]
}

/** Popup content — opened only from interior object clicks */
export type PanelContent =
  | { kind: 'project'; id: string }
  | { kind: 'side-project'; id: string }
  | { kind: 'lab-station'; id: string }
  | { kind: 'publication'; id: string }
  | { kind: 'experience'; id: string }
  | { kind: 'education'; section: 'degrees' | 'certifications' | 'skills' | 'roles' }
  | { kind: 'resume'; id: string }
  | { kind: 'contact' }

export interface BootSequence {
  version: string
  lines: string[]
  welcome: string
  subtitle: string
}

export interface CityData {
  profile: Profile
  districts: District[]
  careerTimeline: CareerTimelineEntry[]
  experience: Experience[]
  education: Education[]
  flagshipProjects: FlagshipProject[]
  skills: Record<string, string[]>
  skillTree: SkillNode[]
  universityDoors: UniversityDoor[]
  academicRoles: AcademicRole[]
  timeline: TimelineMilestone[]
  publications: Publication[]
  certifications: Certification[]
  labStations: LabStation[]
  sideProjects: SideProject[]
  bootSequence: BootSequence
}
