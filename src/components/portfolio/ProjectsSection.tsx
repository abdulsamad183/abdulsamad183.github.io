import { flagshipProjects, otherGithubProjects, profile } from '../../data'
import { SectionHeader, HudCard, TechBadge, ExternalLink } from './ui'

const ACCENTS = ['purple', 'cyan', 'magenta', 'amber'] as const

export function ProjectsSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="projects"
          label="Module 04"
          title="Featured Work"
          subtitle="Four projects that define the stack — production platforms, multi-agent systems, and thesis research."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {flagshipProjects.map((project, i) => (
            <HudCard
              key={project.id}
              accent={ACCENTS[i % ACCENTS.length]}
              className="flex flex-col"
            >
              <p className="font-display text-xs tracking-widest text-jarvis-muted uppercase">{project.building}</p>
              <h3 className="mt-2 text-xl font-bold text-jarvis-text">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-jarvis-muted">{project.description}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-jarvis-muted">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1 shrink-0 text-jarvis-cyan">›</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 5).map((t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4">
                {project.links.github && <ExternalLink href={project.links.github}>GitHub</ExternalLink>}
                {project.links.demo && <ExternalLink href={project.links.demo}>Live Demo</ExternalLink>}
                {project.links.publication && <ExternalLink href={project.links.publication}>Paper</ExternalLink>}
              </div>
            </HudCard>
          ))}
        </div>

        <div className="hud-panel mt-8 rounded-sm px-4 py-5 md:px-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <p className="font-display text-[0.6rem] tracking-[0.3em] text-jarvis-muted uppercase">
              More on GitHub · {otherGithubProjects.length} repos
            </p>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-jarvis-cyan hover:text-white"
            >
              View profile ↗
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {otherGithubProjects.map((project) => (
              <a
                key={project.url}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display rounded-sm border border-jarvis-cyan/20 bg-jarvis-cyan/[0.04] px-3 py-2 text-[0.7rem] tracking-wider text-jarvis-text uppercase transition hover:border-jarvis-cyan/50 hover:bg-jarvis-cyan/10 hover:text-jarvis-cyan"
              >
                {project.name}
                <span className="ml-1 opacity-50">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
