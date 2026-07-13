import { useState } from 'react'
import { education, universityDoors, academicRoles, certifications } from '../../data'
import { PanelShell } from './PanelShell'

export function UniversityPanel({ onClose }: { onClose: () => void }) {
  const [activeDoor, setActiveDoor] = useState<string | null>(null)

  return (
    <PanelShell
      subtitle="AI University // Learning District"
      title="Academy Hallways"
      accentText="text-city-amber"
      accentBorder="border-city-amber/40"
      onClose={onClose}
      wide
    >
      <p className="mb-6 text-sm text-city-muted">
        Select a door to explore education paths, certifications, and academic roles.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {universityDoors.map((door) => {
          const isOpen = activeDoor === door.id
          return (
            <button
              key={door.id}
              type="button"
              onClick={() => setActiveDoor(isOpen ? null : door.id)}
              className={`cursor-pointer rounded-lg border p-4 text-left transition ${
                isOpen
                  ? 'border-city-amber/50 bg-city-amber/10 shadow-[0_0_16px_rgba(255,176,32,0.15)]'
                  : 'border-city-muted/20 bg-city-bg/40 hover:border-city-amber/30 hover:bg-city-amber/5'
              }`}
            >
              <p className="font-display text-sm font-semibold text-city-amber">{door.label}</p>
              <p className="mt-1 text-xs text-city-muted">{door.description}</p>
              {isOpen && (
                <ul className="mt-3 space-y-1 border-t border-city-amber/20 pt-3">
                  {door.items.map((item) => (
                    <li key={item} className="text-xs text-city-text/85">
                      ▸ {item}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        <h3 className="font-display mb-4 text-xs tracking-widest text-city-cyan uppercase">
          Formal Education
        </h3>
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="rounded-lg border border-city-cyan/20 bg-city-cyan/5 p-4"
            >
              <p className="font-semibold text-city-text">{edu.degree}</p>
              <p className="text-sm text-city-muted">{edu.institution}</p>
              <p className="mt-1 text-xs text-city-cyan">
                {edu.period} · CGPA {edu.cgpa}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">
          Academic Roles
        </h3>
        <div className="space-y-3">
          {academicRoles.map((role) => (
            <div key={role.title} className="rounded-lg border border-city-muted/20 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-sm font-semibold text-city-text">{role.title}</p>
                <span className="text-xs text-city-amber">{role.period}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {role.highlights.map((h) => (
                  <li key={h} className="text-xs text-city-muted">
                    • {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-display mb-3 text-xs tracking-widest text-city-muted uppercase">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <span
              key={cert.name}
              className="rounded-full border border-city-amber/30 bg-city-amber/5 px-3 py-1.5 text-xs text-city-text"
            >
              {cert.name} · {cert.issuer}
            </span>
          ))}
        </div>
      </div>
    </PanelShell>
  )
}
