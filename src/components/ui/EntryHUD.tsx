import { useEffect, useState } from 'react'
import {
  profile,
  flagshipProjects,
  publications,
  skillTree,
  experience,
} from '../../data'
import type { DistrictId } from '../../types/city'
import { EXPLORABLE_DISTRICTS } from '../../constants/districtCameras'
import { useCityStore } from '../../store/cityStore'

const NAV_ITEMS: { id: DistrictId; label: string; color: string }[] = [
  { id: 'projects', label: 'PROJECTS', color: '#b026ff' },
  { id: 'publications', label: 'PUBLICATIONS', color: '#00e5ff' },
  { id: 'experience', label: 'EXPERIENCE', color: '#39ff14' },
  { id: 'education', label: 'EDUCATION', color: '#ffb703' },
  { id: 'resume', label: 'RESUME', color: '#00e5ff' },
  { id: 'contact', label: 'CONTACT', color: '#ff2079' },
]

const PANEL_WIDTH = 'w-72'

function HudLink({
  children,
  href,
  onClick,
  accent,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  accent?: string
}) {
  const className =
    'font-display cursor-pointer rounded border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] tracking-[0.2em] text-slate-300 backdrop-blur-md transition hover:border-city-cyan/60 hover:text-city-cyan'

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={{ borderColor: accent ? `${accent}55` : undefined }}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={className} style={{ borderColor: accent ? `${accent}55` : undefined }}>
      {children}
    </button>
  )
}

/** Samad City nav — top of left stack */
function CityNavPanel() {
  const flyToBuilding = useCityStore((s) => s.flyToBuilding)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)

  return (
    <div className={`entry-panel pointer-events-auto ${PANEL_WIDTH} rounded-xl px-5 py-4`}>
      <p className="font-display text-[10px] tracking-[0.35em] text-city-cyan uppercase">Samad City</p>
      <h1 className="font-display mt-1 text-sm font-semibold tracking-wide text-white">
        Top view of the portfolio city
      </h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => flyToBuilding(item.id)}
            className="font-display cursor-pointer rounded border px-2 py-1 text-[9px] tracking-[0.12em] transition"
            style={{
              borderColor: activeDistrictId === item.id ? item.color : `${item.color}44`,
              color: activeDistrictId === item.id ? item.color : '#94a3b8',
              backgroundColor: activeDistrictId === item.id ? `${item.color}18` : 'rgba(0,0,0,0.25)',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ProfilePanel() {
  const projectCount = flagshipProjects.length
  const paperCount = publications.length
  const skillCount = skillTree.length
  const yearsExp = Math.max(1, experience.length)

  return (
    <div className={`entry-panel pointer-events-auto ${PANEL_WIDTH} rounded-xl p-4`}>
      <div className="mb-4 flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0">
          <div className="absolute inset-0 rotate-45 rounded-lg border border-city-cyan/50 bg-city-cyan/10" />
          <div className="absolute inset-2 flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
            <span className="font-display text-lg text-city-cyan">S</span>
          </div>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wide text-white">{profile.name}</h2>
          <p className="text-xs text-city-cyan">{profile.title}</p>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{profile.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <Stat label="Projects" value={`${projectCount}+`} />
        <Stat label="Research" value={`${paperCount}+`} />
        <Stat label="Skills" value={`${skillCount}+`} />
        <Stat label="Experience" value={`${yearsExp}+ yrs`} />
      </div>

      <div className="mt-3 flex gap-3 border-t border-white/10 pt-3">
        <SocialIcon href={profile.links.github} label="GitHub" />
        <SocialIcon href={profile.links.linkedin} label="LinkedIn" />
        <SocialIcon href={`mailto:${profile.email}`} label="Email" />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-black/20 px-2 py-1.5">
      <p className="text-city-muted">{label}</p>
      <p className="font-display text-sm text-white">{value}</p>
    </div>
  )
}

function SocialIcon({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[10px] tracking-wider text-slate-400 transition hover:text-city-cyan"
      title={label}
    >
      {label}
    </a>
  )
}

function SystemPanel() {
  const [time, setTime] = useState('20:45')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={`entry-panel pointer-events-auto ${PANEL_WIDTH} rounded-xl p-4`}>
      <Section title="SYSTEM STATUS">
        <StatusRow label="All Systems" value="Online" ok />
        <StatusRow label="Neural Core" value="Active" ok />
        <StatusRow label="City Grid" value="Stable" ok />
      </Section>

      <Section title="CITY WEATHER" className="mt-3">
        <p className="text-sm text-white">21°C · Light Rain</p>
        <p className="text-[10px] text-slate-400">Atmospheric moisture 78%</p>
      </Section>

      <Section title="TIME" className="mt-3">
        <p className="font-display text-lg text-city-cyan">{time}</p>
        <p className="text-[10px] text-slate-400">Night cycle</p>
      </Section>

      <Section title="AI ASSISTANT" className="mt-3">
        <button
          type="button"
          className="font-display w-full cursor-pointer rounded-lg border border-city-purple/50 bg-city-purple/10 px-3 py-2 text-[10px] tracking-[0.2em] text-city-purple transition hover:bg-city-purple/20"
        >
          TALK TO AI
        </button>
      </Section>

      <button
        type="button"
        className="font-display mt-3 w-full cursor-pointer rounded-lg border border-city-magenta/50 bg-city-magenta/10 px-3 py-2.5 text-[10px] tracking-[0.2em] text-city-magenta transition hover:bg-city-magenta/20"
      >
        LAUNCH DRONE
      </button>
    </div>
  )
}

function Section({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-2 font-display text-[9px] tracking-[0.3em] text-slate-500">{title}</p>
      {children}
    </div>
  )
}

function StatusRow({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between py-0.5 text-[11px]">
      <span className="text-slate-400">{label}</span>
      <span className={ok ? 'text-city-green' : 'text-city-amber'}>
        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
        {value}
      </span>
    </div>
  )
}

function UtilityLinks() {
  const toggleMap = useCityStore((s) => s.toggleMap)
  const goToOverview = useCityStore((s) => s.goToOverview)

  return (
    <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
      <HudLink onClick={toggleMap}>MINI MAP</HudLink>
      <HudLink href={profile.links.resumeFolder}>RESUME</HudLink>
      <HudLink href={profile.links.linkedin}>LINKEDIN</HudLink>
      <HudLink href={profile.links.github}>GITHUB</HudLink>
      <HudLink href="/classic/index.html" accent="#ff2079">
        CLASSIC
      </HudLink>
      <HudLink onClick={goToOverview}>OVERVIEW</HudLink>
    </div>
  )
}

function MiniMap() {
  const mapOpen = useCityStore((s) => s.mapOpen)
  const setMapOpen = useCityStore((s) => s.setMapOpen)
  const flyToBuilding = useCityStore((s) => s.flyToBuilding)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)

  if (!mapOpen) return null

  return (
    <div className="entry-panel pointer-events-auto absolute top-4 right-4 z-50 w-56 rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-[10px] tracking-[0.2em] text-city-cyan">MINI MAP</p>
        <button type="button" onClick={() => setMapOpen(false)} className="text-xs text-slate-400 hover:text-white">
          ✕
        </button>
      </div>
      <div className="relative mx-auto aspect-square w-40 rounded-full border border-city-cyan/30 bg-black/40">
        <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-city-cyan shadow-[0_0_12px_#00e5ff]" />
        {EXPLORABLE_DISTRICTS.filter((id) => id !== 'city-core').map((id, i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
          const r = 38
          const x = 50 + Math.cos(angle) * r
          const y = 50 + Math.sin(angle) * r
          const item = NAV_ITEMS.find((n) => n.id === id)
          return (
            <button
              key={id}
              type="button"
              onClick={() => flyToBuilding(id)}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition hover:scale-150"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: item?.color ?? '#00e5ff',
                boxShadow: activeDistrictId === id ? `0 0 8px ${item?.color}` : undefined,
              }}
              title={item?.label}
            />
          )
        })}
      </div>
    </div>
  )
}

function BuildingViewBar() {
  const goToOverview = useCityStore((s) => s.goToOverview)
  const activeDistrictId = useCityStore((s) => s.activeDistrictId)
  const item = NAV_ITEMS.find((n) => n.id === activeDistrictId)

  return (
    <div className="pointer-events-auto absolute top-4 left-1/2 z-40 -translate-x-1/2">
      <div className="entry-panel flex items-center gap-4 rounded-full px-5 py-2">
        <button
          type="button"
          onClick={goToOverview}
          className="font-display cursor-pointer text-[10px] tracking-[0.2em] text-city-cyan transition hover:text-white"
        >
          ← OVERVIEW
        </button>
        <span className="font-display text-[10px] tracking-[0.2em]" style={{ color: item?.color ?? '#00e5ff' }}>
          {item?.label ?? 'DISTRICT'}
        </span>
      </div>
    </div>
  )
}

export function EntryHUD() {
  const cityView = useCityStore((s) => s.cityView)
  const viewMode = useCityStore((s) => s.viewMode)

  if (viewMode !== 'city') return null

  if (cityView === 'building') {
    return (
      <div className="pointer-events-none fixed inset-0 z-30">
        <BuildingViewBar />
      </div>
    )
  }

  if (cityView !== 'overview') return null

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {/* Left stack: Samad City → Profile → System Status */}
      <div className="absolute top-4 left-4 flex max-h-[calc(100vh-5rem)] flex-col gap-3 overflow-y-auto pr-1">
        <CityNavPanel />
        <ProfilePanel />
        <SystemPanel />
      </div>

      {/* Top right utility links */}
      <div className="absolute top-4 right-4">
        <UtilityLinks />
      </div>

      <MiniMap />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="font-display text-[10px] tracking-[0.3em] text-slate-500">SCROLL TO EXPLORE</p>
        <div className="mx-auto mt-2 h-8 w-5 rounded-full border border-white/20">
          <div className="mx-auto mt-1.5 h-1.5 w-1 animate-bounce rounded-full bg-city-cyan" />
        </div>
      </div>
    </div>
  )
}
