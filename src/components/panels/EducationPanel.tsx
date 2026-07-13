import { useState } from 'react'
import { education, universityDoors, academicRoles, certifications, skillTree } from '../../data'
import type { SkillNode } from '../../types/city'
import { PanelShell } from './PanelShell'

const CATEGORY_COLORS: Record<string, string> = {
  languages: 'border-city-cyan/50 bg-city-cyan/10 text-city-cyan',
  mlDl: 'border-city-magenta/40 bg-city-magenta/10 text-city-magenta',
  genAi: 'border-city-amber/40 bg-city-amber/10 text-city-amber',
  systems: 'border-city-muted/40 bg-city-muted/10 text-city-muted',
  domains: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-400',
}

export function EducationPanel({ onClose }: { onClose: () => void }) {
  const [activeDoor, setActiveDoor] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)

  return (
    <PanelShell
      subtitle="Education Campus // Learning"
      title="Education & Skills"
      accentText="text-city-amber"
      accentBorder="border-city-amber/40"
      onClose={onClose}
      wide
    >
      <section className="mb-8">
        <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">Degrees</h3>
        <div className="space-y-3">
          {education.map((e) => (
            <div key={e.institution} className="rounded-lg border border-city-muted/20 p-4">
              <p className="font-semibold text-city-text">{e.degree}</p>
              <p className="text-sm text-city-muted">{e.institution}</p>
              <p className="mt-1 text-xs text-city-muted">{e.period} · CGPA {e.cgpa}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">Certifications</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {certifications.map((c) => (
            <div key={c.name} className="rounded border border-city-muted/20 px-3 py-2 text-sm">
              <span className="text-city-text">{c.name}</span>
              <span className="text-city-muted"> — {c.issuer}, {c.year}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">Academic Roles</h3>
        {academicRoles.map((r) => (
          <div key={r.title} className="mb-3 rounded-lg border border-city-amber/20 p-4">
            <p className="font-semibold text-city-text">{r.title}</p>
            <p className="text-xs text-city-muted">{r.period}</p>
            <ul className="mt-2 space-y-1">
              {r.highlights.map((h) => (
                <li key={h} className="text-sm text-city-text/80">· {h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">Learning Paths</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {universityDoors.map((door) => {
            const isOpen = activeDoor === door.id
            return (
              <button
                key={door.id}
                type="button"
                onClick={() => setActiveDoor(isOpen ? null : door.id)}
                className={`cursor-pointer rounded-lg border p-3 text-left text-sm ${
                  isOpen ? 'border-city-amber/50 bg-city-amber/10' : 'border-city-muted/20'
                }`}
              >
                <p className="font-semibold text-city-text">{door.label}</p>
                {isOpen && (
                  <ul className="mt-2 space-y-1 text-xs text-city-muted">
                    {door.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">Skill Tree</h3>
        <div className="flex flex-wrap gap-2">
          {skillTree.map((node) => {
            const color = CATEGORY_COLORS[node.category] ?? CATEGORY_COLORS.languages
            const isSelected = selectedSkill?.id === node.id
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedSkill(isSelected ? null : node)}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition ${isSelected ? color : 'border-city-muted/30 text-city-muted'}`}
              >
                {node.label}
              </button>
            )
          })}
        </div>
        {selectedSkill && (
          <div className="mt-4 rounded-lg border border-city-cyan/30 bg-city-cyan/5 p-4">
            <p className="font-semibold text-city-text">{selectedSkill.label}</p>
            {selectedSkill.projects && (
              <p className="mt-2 text-xs text-city-muted">Projects: {selectedSkill.projects.join(', ')}</p>
            )}
          </div>
        )}
      </section>
    </PanelShell>
  )
}
