import type { DistrictId } from '../types/city'
import { useCityStore } from '../store/cityStore'

export class InteractionManager {
  static setHovered(id: DistrictId | null) {
    useCityStore.getState().setHoveredDistrict(id)
  }

  static flyTo(id: DistrictId) {
    useCityStore.getState().flyToBuilding(id)
  }

  static enter(id: DistrictId) {
    useCityStore.getState().enterInterior(id)
  }

  static isHovered(id: DistrictId) {
    return useCityStore.getState().hoveredDistrictId === id
  }

  static isActive(id: DistrictId) {
    return useCityStore.getState().activeDistrictId === id
  }
}
