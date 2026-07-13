import { flagshipProjects, publications, experience, education, certifications, academicRoles, sideProjects, labStations, profile } from '../data'
import { useCityStore } from '../store/cityStore'
import { ProjectPanel } from './panels/ProjectPanel'
import { PanelShell } from './panels/PanelShell'
import { TransmissionHubPanel } from './panels/TransmissionHubPanel'
import { CareerTimelinePanel } from './panels/CareerTimelinePanel'
import { SkillsArenaPanel } from './panels/SkillsArenaPanel'

const EXP_IDS = ['infobell', 'siemens', 'rlhf'] as const

function PublicationDetailPanel({ pubId, onClose }: { pubId: string; onClose: () => void }) {
  const index = pubId === 'pub-0' ? 0 : pubId === 'pub-1' ? 1 : -1
  const pub = publications[index]
  if (!pub) return null

  return (
    <PanelShell
      subtitle="Publications Archive"
      title={pub.title}
      accentText="text-city-magenta"
      accentBorder="border-city-magenta/40"
      onClose={onClose}
    >
      <p className="text-sm text-city-muted">{pub.authors}</p>
      <p className="mt-2 text-sm italic text-city-muted/80">{pub.venue}</p>
      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-city-cyan hover:underline">
        Read publication →
      </a>
    </PanelShell>
  )
}

function ExperienceDetailPanel({ expId, onClose }: { expId: string; onClose: () => void }) {
  if (expId === 'timeline') {
    return <CareerTimelinePanel onClose={onClose} />
  }

  const index = EXP_IDS.indexOf(expId as (typeof EXP_IDS)[number])
  const job = experience[index]
  if (!job) return null

  return (
    <PanelShell
      subtitle="Experience Gallery"
      title={`${job.role} @ ${job.company}`}
      accentText="text-city-muted"
      accentBorder="border-city-muted/40"
      onClose={onClose}
    >
      <p className="text-sm text-city-muted">{job.period} · {job.location}</p>
      <ul className="mt-4 space-y-2">
        {job.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-city-text">
            <span className="text-city-cyan">◆</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((s) => (
          <span key={s} className="rounded-full border border-city-muted/30 px-2 py-0.5 text-xs text-city-muted">{s}</span>
        ))}
      </div>
    </PanelShell>
  )
}

function EducationSectionPanel({ section, onClose }: { section: 'degrees' | 'certifications' | 'skills' | 'roles'; onClose: () => void }) {
  if (section === 'skills') {
    return <SkillsArenaPanel onClose={onClose} />
  }

  const titles = { degrees: 'Degrees', certifications: 'Certifications', roles: 'Academic Roles' }
  return (
    <PanelShell
      subtitle="Education Campus"
      title={titles[section]}
      accentText="text-city-amber"
      accentBorder="border-city-amber/40"
      onClose={onClose}
    >
      {section === 'degrees' &&
        education.map((e) => (
          <div key={e.institution} className="mb-3 rounded border border-city-muted/20 p-3">
            <p className="font-semibold text-city-text">{e.degree}</p>
            <p className="text-sm text-city-muted">{e.institution}</p>
            <p className="text-xs text-city-muted">{e.period} · CGPA {e.cgpa}</p>
          </div>
        ))}
      {section === 'certifications' &&
        certifications.map((c) => (
          <div key={c.name} className="mb-2 text-sm text-city-text">
            {c.name} <span className="text-city-muted">— {c.issuer}, {c.year}</span>
          </div>
        ))}
      {section === 'roles' &&
        academicRoles.map((r) => (
          <div key={r.title} className="mb-3 rounded border border-city-amber/20 p-3">
            <p className="font-semibold text-city-text">{r.title}</p>
            <p className="text-xs text-city-muted">{r.period}</p>
            <ul className="mt-2 text-sm text-city-text/80">
              {r.highlights.map((h) => (
                <li key={h}>· {h}</li>
              ))}
            </ul>
          </div>
        ))}
    </PanelShell>
  )
}

function LabStationPanel({ stationId, onClose }: { stationId: string; onClose: () => void }) {
  const station = labStations.find((s) => s.id === stationId)
  const projects = sideProjects.filter((p) => p.station === stationId)
  if (!station) return null

  return (
    <PanelShell
      subtitle="Projects Loft"
      title={station.label}
      accentText="text-city-cyan"
      accentBorder="border-city-cyan/40"
      onClose={onClose}
      wide
    >
      <p className="mb-4 text-sm text-city-muted">{station.description}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="rounded border border-city-muted/20 p-3">
            <p className="font-semibold text-city-text">{p.name}</p>
            <p className="mt-1 text-xs text-city-muted">{p.description}</p>
            {p.links.github && (
              <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-city-cyan hover:underline">
                GitHub →
              </a>
            )}
          </div>
        ))}
      </div>
    </PanelShell>
  )
}

function ResumeItemPanel({ resumeId, onClose }: { resumeId: string; onClose: () => void }) {
  const resume = profile.resumes.find((r) => r.id === resumeId)
  if (!resume) return null

  return (
    <PanelShell
      subtitle="Document Vault"
      title={resume.label}
      accentText="text-city-cyan"
      accentBorder="border-city-cyan/40"
      onClose={onClose}
    >
      <a
        href={resume.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display inline-block rounded border border-city-cyan/40 bg-city-cyan/10 px-6 py-3 text-sm tracking-wider text-city-cyan uppercase hover:bg-city-cyan/20"
      >
        Download →
      </a>
    </PanelShell>
  )
}

export function ContentPanel() {
  const panelContent = useCityStore((s) => s.panelContent)
  const closePanel = useCityStore((s) => s.closePanel)

  if (!panelContent) return null

  switch (panelContent.kind) {
    case 'project': {
      const project = flagshipProjects.find((p) => p.id === panelContent.id)
      return project ? <ProjectPanel project={project} onClose={closePanel} /> : null
    }
    case 'publication':
      return <PublicationDetailPanel pubId={panelContent.id} onClose={closePanel} />
    case 'experience':
      return <ExperienceDetailPanel expId={panelContent.id} onClose={closePanel} />
    case 'education':
      return <EducationSectionPanel section={panelContent.section} onClose={closePanel} />
    case 'lab-station':
      return <LabStationPanel stationId={panelContent.id} onClose={closePanel} />
    case 'resume':
      return <ResumeItemPanel resumeId={panelContent.id} onClose={closePanel} />
    case 'contact':
      return <TransmissionHubPanel onClose={closePanel} />
    default:
      return null
  }
}
