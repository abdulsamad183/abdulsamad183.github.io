import { DISTRICT_BUILDINGS } from '../config/cityLayout'
import type { DistrictId } from '../types/city'

export class DistrictManager {
  static getAll() {
    return DISTRICT_BUILDINGS
  }

  static getByDistrictId(id: DistrictId) {
    return DISTRICT_BUILDINGS.find((d) => d.districtId === id)
  }

  static getInteractive() {
    return DISTRICT_BUILDINGS.filter((d) => d.interactive)
  }

  static getLabel(id: DistrictId) {
    return DistrictManager.getByDistrictId(id)?.label ?? id
  }
}
