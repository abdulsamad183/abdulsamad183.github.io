import { flagshipProjects, sideProjects, labStations } from '../../data'
import { SectionHeader, HudCard, TechBadge, ExternalLink } from './ui'

export function ProjectsSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="projects"
          label="Module 04"
          title="Project Arsenal"
          subtitle="Flagship systems and experimental builds — from production platforms to research prototypes."
        />

        <p className="font-display mb-6 text-xs tracking-[0.25em] text-jarvis-purple uppercase">Flagship Systems</p>
        <div className="grid gap-6 md:grid-cols-3">
          {flagshipProjects.map((project, i) => (
            <HudCard key={project.id} accent={i === 0 ? 'purple' : i === 1 ? 'cyan' : 'magenta'} className="flex flex-col">
              <p className="font-display text-xs tracking-widest text-jarvis-muted uppercase">{project.building}</p>
              <h3 className="mt-2 text-xl font-bold text-jarvis-text">{project.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-jarvis-muted">{project.description}</p>
              <ul className="mt-4 space-y-1 text-xs text-jarvis-muted">
                {project.features.slice(0, 3).map((f) => (
                  <li key={f}>
                    <span className="text-jarvis-cyan">›</span> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ))}
              </div>
              <div className="mt-5 flex gap-4">
                {project.links.github && <ExternalLink href={project.links.github}>GitHub</ExternalLink>}
                {'demo' in project.links && project.links.demo && (
                  <ExternalLink href={project.links.demo}>Live Demo</ExternalLink>
                )}
                {'publication' in project.links && project.links.publication && (
                  <ExternalLink href={project.links.publication}>Paper</ExternalLink>
                )}
              </div>
            </HudCard>
          ))}
        </div>

        <p className="font-display mt-14 mb-6 text-xs tracking-[0.25em] text-jarvis-cyan uppercase">Lab Stations</p>
        <div className="grid gap-6 lg:grid-cols-2">
          {labStations.map((station) => {
            const projects = sideProjects.filter((p) => p.station === station.id)
            return (
              <HudCard key={station.id} accent="cyan">
                <h3 className="font-display text-lg font-bold text-jarvis-cyan">{station.label}</h3>
                <p className="mt-1 text-sm text-jarvis-muted">{station.description}</p>
                <div className="mt-4 space-y-3">
                  {projects.map((p) => (
                    <div key={p.id} className="border-l-2 border-jarvis-cyan/30 pl-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-semibold text-jarvis-text">{p.name}</h4>
                        <div className="flex gap-3">
                          {p.links.demo && <ExternalLink href={p.links.demo}>Live Demo</ExternalLink>}
                          {p.links.github && <ExternalLink href={p.links.github}>Repo</ExternalLink>}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-jarvis-muted">{p.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 3).map((t) => (
                          <TechBadge key={t}>{t}</TechBadge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </HudCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
