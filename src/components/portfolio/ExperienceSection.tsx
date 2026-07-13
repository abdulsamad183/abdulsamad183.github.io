import { experience } from '../../data'
import { SectionHeader, HudCard, TechBadge } from './ui'

const ACCENTS = ['cyan', 'green', 'purple'] as const

export function ExperienceSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="experience"
          label="Module 03"
          title="Career Log"
          subtitle="Professional deployments across enterprise AI, research, and LLM training."
        />

        <div className="relative space-y-6 pl-6 md:pl-8">
          <div className="timeline-line absolute top-2 bottom-2 left-0 w-px" />

          {experience.map((job, i) => (
            <div key={`${job.company}-${job.period}`} className="relative">
              <div className="absolute top-6 -left-6 h-3 w-3 rounded-full border-2 border-jarvis-cyan bg-jarvis-bg md:-left-8" />
              <HudCard accent={ACCENTS[i % ACCENTS.length]}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold text-jarvis-text">
                      {job.role}
                      <span className="text-jarvis-cyan"> @ </span>
                      {job.company}
                    </p>
                    <p className="mt-1 text-sm text-jarvis-muted">
                      {job.period} · {job.location}
                    </p>
                  </div>
                  <span className="font-display text-xs tracking-widest text-jarvis-cyan uppercase">
                    {i === 0 ? 'Active' : 'Complete'}
                  </span>
                </div>

                {job.projects && job.projects.length > 0 ? (
                  <div className="mt-5 space-y-5">
                    {job.projects.map((project) => (
                      <div key={project.name} className="border-l-2 border-jarvis-cyan/25 pl-4">
                        <h4 className="font-display text-sm font-semibold tracking-wide text-jarvis-cyan uppercase">
                          {project.name}
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-jarvis-muted">
                          {project.highlights.map((h) => (
                            <li key={h} className="flex gap-2 leading-relaxed">
                              <span className="mt-1 shrink-0 text-jarvis-cyan">▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-4 space-y-2 text-jarvis-muted">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm leading-relaxed">
                        <span className="shrink-0 text-jarvis-cyan">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <TechBadge key={s}>{s}</TechBadge>
                  ))}
                </div>
              </HudCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
