import { create } from 'zustand'
import type { AppPhase, CameraState, CityView, DistrictId, PanelContent, ViewMode } from '../types/city'
import { DISTRICT_CAMERAS, EXPLORABLE_DISTRICTS, PANEL_DISTRICTS } from '../constants/districtCameras'
import { INTERIOR_CAMERAS, getEnterApproachCamera } from '../constants/interiorCameras'
import { ENTRY_CAMERA } from '../config/cityLayout'

interface CityStore {
  phase: AppPhase
  viewMode: ViewMode
  cityView: CityView
  mapOpen: boolean
  bootComplete: boolean
  activeDistrictId: DistrictId
  hoveredDistrictId: DistrictId | null
  selectedDistrictId: DistrictId | null
  interiorDistrictId: DistrictId | null
  panelContent: PanelContent | null
  isTransitioning: boolean
  camera: CameraState
  setPhase: (phase: AppPhase) => void
  setMapOpen: (open: boolean) => void
  setHoveredDistrict: (id: DistrictId | null) => void
  completeBoot: () => void
  toggleMap: () => void
  goToOverview: () => void
  flyToBuilding: (id: DistrictId) => void
  enterInterior: (id: DistrictId) => void
  exitInterior: () => void
  openPanel: (content: PanelContent) => void
  closePanel: () => void
  clearSelection: () => void
}

export const useCityStore = create<CityStore>((set, get) => ({
  phase: 'boot',
  viewMode: 'city',
  cityView: 'overview',
  mapOpen: false,
  bootComplete: false,
  activeDistrictId: 'city-core',
  hoveredDistrictId: null,
  selectedDistrictId: null,
  interiorDistrictId: null,
  panelContent: null,
  isTransitioning: false,
  camera: {
    position: [...ENTRY_CAMERA.position],
    target: [...ENTRY_CAMERA.target],
  },

  setPhase: (phase) => set({ phase }),
  setMapOpen: (mapOpen) => set({ mapOpen }),
  setHoveredDistrict: (hoveredDistrictId) => set({ hoveredDistrictId }),
  completeBoot: () =>
    set({
      bootComplete: true,
      phase: 'city',
      viewMode: 'city',
      cityView: 'overview',
      activeDistrictId: 'city-core',
      hoveredDistrictId: null,
      camera: {
        position: [...ENTRY_CAMERA.position],
        target: [...ENTRY_CAMERA.target],
      },
    }),
  toggleMap: () => set((s) => ({ mapOpen: !s.mapOpen })),

  goToOverview: () => {
    if (get().viewMode === 'interior') return
    set({
      cityView: 'overview',
      activeDistrictId: 'city-core',
      hoveredDistrictId: null,
      selectedDistrictId: null,
      isTransitioning: true,
      panelContent: null,
      mapOpen: false,
      camera: {
        position: [...ENTRY_CAMERA.position],
        target: [...ENTRY_CAMERA.target],
      },
    })
    window.setTimeout(() => set({ isTransitioning: false }), 1400)
  },

  flyToBuilding: (id) => {
    if (!EXPLORABLE_DISTRICTS.includes(id) || get().viewMode === 'interior') return
    const config = DISTRICT_CAMERAS[id]
    if (!config) return

    set({
      activeDistrictId: id,
      selectedDistrictId: id,
      cityView: 'building',
      isTransitioning: true,
      panelContent: null,
      mapOpen: false,
      camera: {
        position: [...config.position],
        target: [...config.target],
      },
    })

    window.setTimeout(() => set({ isTransitioning: false }), 1200)
  },

  enterInterior: (id) => {
    if (!PANEL_DISTRICTS.includes(id) || get().viewMode !== 'city' || get().cityView !== 'building') return
    const interiorCam = INTERIOR_CAMERAS[id as keyof typeof INTERIOR_CAMERAS]
    if (!interiorCam) return

    const approach = getEnterApproachCamera(id)

    set({
      activeDistrictId: id,
      selectedDistrictId: id,
      interiorDistrictId: id,
      isTransitioning: true,
      panelContent: null,
      mapOpen: false,
      camera: approach
        ? { position: [...approach.position], target: [...approach.target] }
        : { position: [...interiorCam.position], target: [...interiorCam.target] },
    })

    window.setTimeout(() => {
      set({
        viewMode: 'interior',
        camera: {
          position: [...interiorCam.position],
          target: [...interiorCam.target],
        },
      })
    }, approach ? 700 : 0)

    window.setTimeout(() => set({ isTransitioning: false }), approach ? 1800 : 1200)
  },

  exitInterior: () => {
    const { interiorDistrictId } = get()
    if (!interiorDistrictId) return

    set({
      isTransitioning: true,
      panelContent: null,
      viewMode: 'city',
      cityView: 'overview',
      interiorDistrictId: null,
      hoveredDistrictId: null,
      camera: {
        position: [...ENTRY_CAMERA.position],
        target: [...ENTRY_CAMERA.target],
      },
    })

    window.setTimeout(() => set({ isTransitioning: false }), 1400)
  },

  openPanel: (content) => set({ panelContent: content }),

  closePanel: () => set({ panelContent: null }),

  clearSelection: () => set({ selectedDistrictId: null }),
}))
