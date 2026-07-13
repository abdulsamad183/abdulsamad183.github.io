import type { DistrictId } from '../types/city'
import type { CameraState } from '../types/city'

/** First-person room camera — standing inside the doorway, looking into the room */
export const INTERIOR_CAMERAS: Record<Exclude<DistrictId, 'city-core'>, CameraState> = {
  projects: { position: [0, 1.62, 2.9], target: [0, 1.25, -1.2] },
  publications: { position: [0, 1.62, 2.8], target: [0, 1.3, -2.0] },
  experience: { position: [0, 1.62, 2.85], target: [0, 1.45, -2.2] },
  education: { position: [0, 1.62, 2.85], target: [0, 1.35, -1.5] },
  resume: { position: [0, 1.62, 2.75], target: [0, 1.1, -1.8] },
  contact: { position: [0, 1.62, 2.8], target: [0, 1.2, -1.4] },
}

/** Brief exterior approach before crossing the threshold */
export function getEnterApproachCamera(districtId: DistrictId): CameraState | null {
  const approaches: Partial<Record<DistrictId, CameraState>> = {
    projects: { position: [-9, 2.2, 2.5], target: [-9, 2, -2] },
    publications: { position: [9, 2.2, 2.5], target: [9, 2, -2] },
    experience: { position: [0, 2.5, -6], target: [0, 2, -10] },
    education: { position: [-9, 2.2, 9], target: [-9, 2, 6] },
    resume: { position: [9, 2.2, 9], target: [9, 2, 6] },
    contact: { position: [0, 2.2, 8], target: [0, 2, 12] },
  }
  return approaches[districtId] ?? null
}
