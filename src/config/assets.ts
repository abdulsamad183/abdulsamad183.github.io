export type BuildingAssetId =
  | 'ai_core_tower'
  | 'projects_hq'
  | 'research_institute'
  | 'experience_district'
  | 'education_center'
  | 'resume_center'
  | 'contact_tower'
  | 'skyline_a'
  | 'skyline_b'
  | 'skyline_c'
  | 'skyline_d'
  | 'skyline_e'
  | 'skyline_f'
  | 'skyline_g'
  | 'skyline_h'

const BASE = '/assets/buildings'

export const BUILDING_ASSETS: Record<BuildingAssetId, string> = {
  ai_core_tower: `${BASE}/ai_core_tower.glb`,
  projects_hq: `${BASE}/projects_hq.glb`,
  research_institute: `${BASE}/research_institute.glb`,
  experience_district: `${BASE}/experience_district.glb`,
  education_center: `${BASE}/education_center.glb`,
  resume_center: `${BASE}/resume_center.glb`,
  contact_tower: `${BASE}/contact_tower.glb`,
  skyline_a: `${BASE}/skyline_a.glb`,
  skyline_b: `${BASE}/skyline_b.glb`,
  skyline_c: `${BASE}/skyline_c.glb`,
  skyline_d: `${BASE}/skyline_d.glb`,
  skyline_e: `${BASE}/skyline_e.glb`,
  skyline_f: `${BASE}/skyline_f.glb`,
  skyline_g: `${BASE}/skyline_g.glb`,
  skyline_h: `${BASE}/skyline_h.glb`,
}

export const ALL_BUILDING_ASSETS = Object.keys(BUILDING_ASSETS) as BuildingAssetId[]
