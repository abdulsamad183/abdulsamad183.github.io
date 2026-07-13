import { profile, districts } from '../data'
import type { District, DistrictId } from '../types/city'
import { EXPLORABLE_DISTRICTS } from '../constants/districtCameras'
import { useCityStore } from '../store/cityStore'

function HudButton({
  children,
  onClick,
  href,
  external,
}: {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
}) {
  const className =
    'font-display cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-city-cyan shadow-sm transition hover:border-city-cyan hover:bg-cyan-50'

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}

function DistrictStatusBadge({ district }: { district: District }) {
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)

  if (district.id === activeDistrictId) {
    return (
      <span className="mt-2 inline-block rounded bg-city-cyan/20 px-2 py-0.5 text-[10px] tracking-wider text-city-cyan uppercase">
        You are here
      </span>
    )
  }
  if (district.status === 'explorable') {
    return (
      <span className="mt-2 inline-block rounded bg-city-amber/20 px-2 py-0.5 text-[10px] tracking-wider text-city-amber uppercase">
        Click to fly
      </span>
    )
  }
  if (district.status === 'active') {
    return (
      <span className="mt-2 inline-block rounded bg-city-cyan/20 px-2 py-0.5 text-[10px] tracking-wider text-city-cyan uppercase">
        Active
      </span>
    )
  }
  return (
    <span className="mt-2 inline-block rounded bg-city-muted/20 px-2 py-0.5 text-[10px] tracking-wider text-city-muted uppercase">
      Locked
    </span>
  )
}

export function HUD() {
  const mapOpen = useCityStore((s) => s.mapOpen)
  const viewMode = useCityStore((s) => s.viewMode)
  const cityView = useCityStore((s) => s.cityView)
  const toggleMap = useCityStore((s) => s.toggleMap)
  const setMapOpen = useCityStore((s) => s.setMapOpen)
  const flyToBuilding = useCityStore((s) => s.flyToBuilding)
  const goToOverview = useCityStore((s) => s.goToOverview)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)

  const handleDistrictClick = (district: District) => {
    if (!EXPLORABLE_DISTRICTS.includes(district.id as DistrictId)) return
    flyToBuilding(district.id as DistrictId)
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between p-4 md:p-6">
        <div className="pointer-events-auto">
          <p className="font-display text-xs tracking-[0.25em] text-city-cyan/60 uppercase">Samad City</p>
          <h1 className="font-display text-lg font-bold text-city-text md:text-xl">{profile.name}</h1>
          <p className="text-xs text-city-muted">{profile.title}</p>
        </div>

        <nav className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          {viewMode === 'city' && cityView === 'building' && (
            <HudButton onClick={goToOverview}>City Map</HudButton>
          )}
          {viewMode === 'city' && <HudButton onClick={toggleMap}>[M] Map</HudButton>}
          <HudButton href={profile.links.resumeFolder} external>
            Resume
          </HudButton>
          <HudButton href={profile.links.linkedin} external>
            LinkedIn
          </HudButton>
          <HudButton href={profile.links.github} external>
            GitHub
          </HudButton>
          <HudButton href="/classic/">Classic</HudButton>
        </nav>
      </header>

      {mapOpen && viewMode === 'city' && (
        <CityMapOverlay
          activeDistrictId={activeDistrictId}
          onClose={() => setMapOpen(false)}
          onSelectDistrict={handleDistrictClick}
        />
      )}
    </>
  )
}

function CityMapOverlay({
  activeDistrictId,
  onClose,
  onSelectDistrict,
}: {
  activeDistrictId: DistrictId
  onClose: () => void
  onSelectDistrict: (district: District) => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="panel-glass glow-border relative mx-4 w-full max-w-3xl rounded-xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Samad City Map"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-display text-xs tracking-widest text-city-cyan uppercase">
              Tactical Map // Press [M] to toggle
            </p>
            <h2 className="font-display text-xl font-bold text-city-text">Samad City</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded border border-city-muted/40 px-3 py-1 text-xs text-city-muted hover:text-city-text"
          >
            ESC
          </button>
        </div>

        {/* Isometric-style map grid */}
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg border border-city-cyan/20 bg-city-bg/80">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
          {districts.map((d, i) => {
            const isExplorable = EXPLORABLE_DISTRICTS.includes(d.id as DistrictId)
            const isHere = d.id === activeDistrictId
            const positions = [
              'left-1/2 top-[20%] -translate-x-1/2',
              'left-[20%] top-[40%]',
              'right-[20%] top-[40%]',
              'left-1/2 top-[55%] -translate-x-1/2',
              'left-[20%] bottom-[18%]',
              'right-[20%] bottom-[18%]',
              'left-1/2 bottom-[8%] -translate-x-1/2',
            ]
            return (
              <button
                key={d.id}
                type="button"
                disabled={!isExplorable}
                onClick={() => onSelectDistrict(d)}
                className={`absolute ${positions[i] ?? 'left-1/2 top-1/2'} font-display rounded border px-2 py-1 text-[10px] tracking-wider uppercase transition md:px-3 md:py-1.5 md:text-xs ${
                  isHere
                    ? 'border-city-cyan bg-city-cyan/20 text-city-cyan shadow-[0_0_16px_rgba(0,240,255,0.3)]'
                    : isExplorable
                      ? 'cursor-pointer border-city-amber/40 bg-city-amber/10 text-city-amber hover:bg-city-amber/20'
                      : 'cursor-not-allowed border-city-muted/20 text-city-muted opacity-50'
                }`}
              >
                {d.shortName}
              </button>
            )
          })}
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-city-cyan shadow-[0_0_12px_#00f0ff]" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {districts.map((d: District) => {
            const isExplorable = EXPLORABLE_DISTRICTS.includes(d.id as DistrictId)
            return (
              <button
                key={d.id}
                type="button"
                disabled={!isExplorable}
                onClick={() => onSelectDistrict(d)}
                className={`rounded-lg border p-4 text-left transition ${
                  d.id === activeDistrictId
                    ? 'border-city-cyan/50 bg-city-cyan/10'
                    : isExplorable
                      ? 'cursor-pointer border-city-amber/30 bg-city-bg/50 hover:border-city-amber/50 hover:bg-city-amber/5'
                      : 'cursor-not-allowed border-city-muted/20 bg-city-bg/30 opacity-60'
                }`}
              >
                <p className="font-display text-sm font-semibold text-city-text">{d.shortName}</p>
                <p className="mt-1 text-xs text-city-muted">{d.description}</p>
                <DistrictStatusBadge district={d} />
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-city-muted">
          Step 1: Click a building · Step 2: Press Enter to go inside
        </p>
      </div>
    </div>
  )
}
