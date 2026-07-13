import type { FlagshipProject } from '../../types/city'
import { PanelShell } from './PanelShell'

const ACCENT: Record<string, { text: string; border: string }> = {
  gitsight: { text: 'text-city-cyan', border: 'border-city-cyan/40' },
  yesbroker: { text: 'text-city-magenta', border: 'border-city-magenta/40' },
  thesis: { text: 'text-city-cyan', border: 'border-city-cyan/40' },
}

export function ProjectPanel({
  project,
  onClose,
}: {
  project: FlagshipProject
  onClose: () => void
}) {
  const accent = ACCENT[project.id] ?? ACCENT.gitsight

  return (
    <PanelShell
      subtitle={`District Access // ${project.building}`}
      title={project.name}
      accentText={accent.text}
      accentBorder={accent.border}
      onClose={onClose}
    >
      <p className="text-sm leading-relaxed text-city-text/85">{project.description}</p>

      <div className="mt-6">
        <h3 className="font-display mb-3 text-xs tracking-widest text-city-cyan uppercase">
          System Features
        </h3>
        <ul className="space-y-2">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 rounded border border-city-cyan/15 bg-city-cyan/5 px-3 py-2 text-sm text-city-text"
            >
              <span className="text-city-cyan">◆</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="font-display mb-3 text-xs tracking-widest text-city-muted uppercase">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-city-muted/30 bg-city-bg/60 px-3 py-1 text-xs text-city-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display rounded border border-city-cyan/40 bg-city-cyan/10 px-4 py-2 text-xs tracking-wider text-city-cyan uppercase transition hover:bg-city-cyan/20"
          >
            GitHub
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display rounded border border-city-magenta/40 bg-city-magenta/10 px-4 py-2 text-xs tracking-wider text-city-magenta uppercase transition hover:bg-city-magenta/20"
          >
            Live Demo
          </a>
        )}
        {project.links.publication && (
          <a
            href={project.links.publication}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display rounded border border-city-amber/40 bg-city-amber/10 px-4 py-2 text-xs tracking-wider text-city-amber uppercase transition hover:bg-city-amber/20"
          >
            Publication
          </a>
        )}
      </div>
    </PanelShell>
  )
}
