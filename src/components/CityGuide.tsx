import { districts } from '../data'
import { PANEL_DISTRICTS } from '../constants/districtCameras'
import { INTERIOR_ROOMS } from '../config/interiorContent'
import { useCityStore } from '../store/cityStore'

export function CityGuide() {
  const cityView = useCityStore((s) => s.cityView)
  const viewMode = useCityStore((s) => s.viewMode)
  const interiorDistrictId = useCityStore((s) => s.interiorDistrictId)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)
  const panelContent = useCityStore((s) => s.panelContent)
  const isTransitioning = useCityStore((s) => s.isTransitioning)

  if (panelContent || isTransitioning) return null

  if (viewMode === 'interior' && interiorDistrictId) {
    const room = INTERIOR_ROOMS[interiorDistrictId as keyof typeof INTERIOR_ROOMS]
    return (
      <div className="pointer-events-none fixed inset-x-0 top-20 z-30 flex justify-center px-4 md:top-24">
        <div className="panel-glass max-w-lg rounded-xl px-5 py-3 text-center">
          <p className="font-display text-sm font-semibold text-city-text">{room?.title ?? 'Interior'}</p>
          <p className="mt-1 text-sm text-city-muted">
            {room?.subtitle ?? 'Click objects on the desk, shelf, or wall to read details'}
          </p>
        </div>
      </div>
    )
  }

  if (cityView === 'overview') {
    return (
      <div className="pointer-events-none fixed inset-x-0 top-20 z-30 flex justify-center px-4 md:top-24">
        <div className="panel-glass glow-border max-w-xl rounded-xl px-6 py-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-city-cyan uppercase">Welcome to Samad City</p>
          <h2 className="font-display mt-2 text-lg font-bold text-city-text md:text-xl">Top view of the portfolio city</h2>
          <p className="mt-2 text-sm text-city-muted">
            Each building is a section of my portfolio. <strong className="text-city-text">Click a labeled building</strong> to fly there.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {districts
              .filter((d) => d.id !== 'city-core')
              .map((d) => (
                <span
                  key={d.id}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-city-muted"
                >
                  {d.shortName}
                </span>
              ))}
          </div>
        </div>
      </div>
    )
  }

  const district = districts.find((d) => d.id === activeDistrictId)
  const canEnter = district && PANEL_DISTRICTS.includes(activeDistrictId)

  if (cityView === 'building' && district) {
    return (
      <div className="pointer-events-none fixed inset-x-0 top-20 z-30 flex justify-center px-4 md:top-24">
        <div className="panel-glass max-w-md rounded-xl px-5 py-3 text-center">
          <p className="font-display text-sm font-semibold text-city-text">{district.name}</p>
          <p className="mt-1 text-sm text-city-muted">
            {canEnter
              ? 'Press [E] or click Enter below to walk inside'
              : 'Explore the area around this building'}
          </p>
        </div>
      </div>
    )
  }

  return null
}
