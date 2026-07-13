import { useState } from 'react'
import { labStations, sideProjects } from '../../data'
import { PanelShell } from './PanelShell'

const STATION_COLORS: Record<string, string> = {
  'ai-playground': 'border-city-magenta/40 text-city-magenta',
  'side-projects': 'border-city-cyan/40 text-city-cyan',
  experiments: 'border-city-amber/40 text-city-amber',
  'demo-zone': 'border-emerald-400/40 text-emerald-400',
}

export function InnovationLabsPanel({ onClose }: { onClose: () => void }) {
  const [activeStation, setActiveStation] = useState<string | null>(labStations[0]?.id ?? null)

  const filteredProjects = activeStation
    ? sideProjects.filter((p) => p.station === activeStation)
    : sideProjects

  return (
    <PanelShell
      subtitle="Innovation Labs // R&D District"
      title="Project Laboratories"
      accentText="text-city-magenta"
      accentBorder="border-city-magenta/40"
      onClose={onClose}
      wide
    >
      <p className="mb-6 text-sm text-city-muted">
        Explore side projects, experiments, and live demos across four lab stations.
      </p>

      {/* Station selector */}
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {labStations.map((station) => {
          const isActive = activeStation === station.id
          const color = STATION_COLORS[station.id] ?? STATION_COLORS['side-projects']
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => setActiveStation(station.id)}
              className={`cursor-pointer rounded-lg border p-3 text-left transition ${
                isActive
                  ? `bg-city-bg/80 ${color.split(' ')[0]} shadow-[0_0_12px_rgba(255,45,149,0.15)]`
                  : 'border-city-muted/20 hover:border-city-magenta/30'
              }`}
            >
              <p className={`font-display text-xs font-semibold ${isActive ? color.split(' ')[1] : 'text-city-text'}`}>
                {station.label}
              </p>
              <p className="mt-1 text-[10px] text-city-muted">{station.description}</p>
            </button>
          )
        })}
      </div>

      {/* Project cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-city-muted/20 bg-city-bg/40 p-4 transition hover:border-city-magenta/30"
          >
            <p className="font-display font-semibold text-city-text">{project.name}</p>
            <p className="mt-2 text-xs leading-relaxed text-city-muted">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-city-muted/25 px-2 py-0.5 text-[10px] text-city-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-city-cyan hover:underline"
                >
                  GitHub →
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-city-magenta hover:underline"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-sm text-city-muted">No projects in this station yet.</p>
      )}
    </PanelShell>
  )
}
