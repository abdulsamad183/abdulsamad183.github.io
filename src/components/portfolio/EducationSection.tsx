import { education, certifications, academicRoles } from '../../data'
import { SectionHeader, HudCard } from './ui'

export function EducationSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="education"
          label="Module 06"
          title="Education & Credentials"
          subtitle="Academic foundation from IIIT RGUKT to IIT Dharwad, plus verified certifications."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <HudCard key={edu.institution} accent={i === 0 ? 'amber' : 'cyan'}>
              <p className="font-display text-xs tracking-widest text-jarvis-amber uppercase">
                {i === 0 ? 'Graduate' : 'Undergraduate'}
              </p>
              <h3 className="mt-2 text-lg font-bold text-jarvis-text">{edu.degree}</h3>
              <p className="mt-2 text-jarvis-cyan">{edu.institution}</p>
              <div className="mt-4 flex gap-6 text-sm">
                <div>
                  <p className="text-xs tracking-wider text-jarvis-muted uppercase">Period</p>
                  <p className="mt-1 text-jarvis-text">{edu.period}</p>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-jarvis-muted uppercase">CGPA</p>
                  <p className="mt-1 font-display text-jarvis-cyan">{edu.cgpa}</p>
                </div>
              </div>
            </HudCard>
          ))}
        </div>

        <p className="font-display mt-12 mb-5 text-xs tracking-[0.25em] text-jarvis-muted uppercase">Certifications</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {certifications.map((cert) => (
            <HudCard key={cert.name} accent="purple">
              <h4 className="font-semibold text-jarvis-text">{cert.name}</h4>
              <p className="mt-2 text-sm text-jarvis-muted">
                {cert.issuer} · {cert.year}
              </p>
            </HudCard>
          ))}
        </div>

        <p className="font-display mt-12 mb-5 text-xs tracking-[0.25em] text-jarvis-muted uppercase">Academic Roles</p>
        <div className="grid gap-4 md:grid-cols-2">
          {academicRoles.map((role) => (
            <HudCard key={role.title} accent="green">
              <h4 className="font-semibold text-jarvis-text">{role.title}</h4>
              <p className="mt-1 text-sm text-jarvis-cyan">{role.period}</p>
              <ul className="mt-3 space-y-1 text-sm text-jarvis-muted">
                {role.highlights.map((h) => (
                  <li key={h}>
                    <span className="text-jarvis-green">›</span> {h}
                  </li>
                ))}
              </ul>
            </HudCard>
          ))}
        </div>
      </div>
    </section>
  )
}
