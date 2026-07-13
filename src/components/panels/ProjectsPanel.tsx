import { useState } from 'react'
import { flagshipProjects, labStations, sideProjects } from '../../data'
import { PanelShell } from './PanelShell'
import type { FlagshipProject } from '../../types/city'

function FlagshipCard({ project }: { project: FlagshipProject }) {
  return (
    <div className="rounded-lg border border-city-cyan/30 bg-city-cyan/5 p-5">
      <p className="font-display text-xs tracking-widest text-city-cyan uppercase">Flagship</p>
      <h3 className="mt-2 font-display text-lg font-bold text-city-text">{project.name}</h3>
      <p className="mt-2 text-sm text-city-text/85">{project.description}</p>
      <ul className="mt-3 space-y-1.5">
        {project.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-city-text">
            <span className="text-city-cyan">◆</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border border-city-muted/30 px-2 py-0.5 text-xs text-city-muted">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-xs text-city-cyan hover:underline">
            GitHub →
          </a>
        )}
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-xs text-city-magenta hover:underline">
            Live Demo →
          </a>
        )}
        {project.links.publication && (
          <a href={project.links.publication} target="_blank" rel="noopener noreferrer" className="text-xs text-city-amber hover:underline">
            Paper →
          </a>
        )}
      </div>
    </div>
  )
}

export function ProjectsPanel({ onClose }: { onClose: () => void }) {
  const [activeStation, setActiveStation] = useState<string | null>(null)
  const filteredSide = activeStation ? sideProjects.filter((p) => p.station === activeStation) : sideProjects

  return (
    <PanelShell
      subtitle="Projects Tower // All Work"
      title="Projects"
      accentText="text-city-cyan"
      accentBorder="border-city-cyan/40"
      onClose={onClose}
      wide
    >
      <p className="mb-6 text-sm text-city-muted">
        GitSight, YesBroker, thesis work, side projects, and experiments — all in one district.
      </p>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {flagshipProjects.map((p) => (
          <FlagshipCard key={p.id} project={p} />
        ))}
      </div>

      <h3 className="font-display mb-3 text-xs tracking-widest text-city-muted uppercase">Lab Stations // Side Projects</h3>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveStation(null)}
          className={`cursor-pointer rounded border px-3 py-1.5 text-xs ${!activeStation ? 'border-city-cyan/50 text-city-cyan' : 'border-city-muted/30 text-city-muted'}`}
        >
          All
        </button>
        {labStations.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveStation(s.id)}
            className={`cursor-pointer rounded border px-3 py-1.5 text-xs ${
              activeStation === s.id ? 'border-city-magenta/50 text-city-magenta' : 'border-city-muted/30 text-city-muted'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredSide.map((project) => (
          <div key={project.id} className="rounded-lg border border-city-muted/20 p-4 hover:border-city-cyan/30">
            <p className="font-semibold text-city-text">{project.name}</p>
            <p className="mt-2 text-xs text-city-muted">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full border border-city-muted/25 px-2 py-0.5 text-[10px] text-city-muted">
                  {t}
                </span>
              ))}
            </div>
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-city-cyan hover:underline">
                GitHub →
              </a>
            )}
          </div>
        ))}
      </div>
    </PanelShell>
  )
}
