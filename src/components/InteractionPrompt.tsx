import { PANEL_DISTRICTS } from '../constants/districtCameras'
import { INTERIOR_ROOMS } from '../config/interiorContent'
import { districts } from '../data'
import { useCityStore } from '../store/cityStore'

export function InteractionPrompt() {
  const viewMode = useCityStore((s) => s.viewMode)
  const cityView = useCityStore((s) => s.cityView)
  const interiorDistrictId = useCityStore((s) => s.interiorDistrictId)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)
  const panelContent = useCityStore((s) => s.panelContent)
  const enterInterior = useCityStore((s) => s.enterInterior)
  const exitInterior = useCityStore((s) => s.exitInterior)
  const isTransitioning = useCityStore((s) => s.isTransitioning)

  if (panelContent || isTransitioning) return null

  if (viewMode === 'interior' && interiorDistrictId) {
    const room = INTERIOR_ROOMS[interiorDistrictId as keyof typeof INTERIOR_ROOMS]
    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex flex-col items-center gap-2">
        <p className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-slate-400 backdrop-blur-md">
          {room?.subtitle ?? 'Click an object for details'}
        </p>
        <button
          type="button"
          onClick={exitInterior}
          className="pointer-events-auto cursor-pointer rounded-full border border-city-cyan/40 bg-black/60 px-5 py-2 text-xs font-medium text-city-cyan backdrop-blur-md transition hover:bg-city-cyan/10"
        >
          [ESC] Back to city map
        </button>
      </div>
    )
  }

  if (cityView === 'building') {
    const district = districts.find((d) => d.id === activeDistrictId)
    const canEnter = PANEL_DISTRICTS.includes(activeDistrictId)

    if (!canEnter || !district) return null

    return (
      <button
        type="button"
        onClick={() => enterInterior(activeDistrictId)}
        className="pointer-events-auto fixed bottom-10 left-1/2 z-40 -translate-x-1/2 cursor-pointer rounded-full border border-city-amber/50 bg-black/70 px-8 py-3 font-display text-sm font-semibold tracking-wide text-city-amber shadow-[0_0_20px_rgba(255,183,3,0.2)] backdrop-blur-md transition hover:bg-city-amber/10 md:bottom-12"
      >
        [E] Enter {district.shortName}
      </button>
    )
  }

  return null
}
