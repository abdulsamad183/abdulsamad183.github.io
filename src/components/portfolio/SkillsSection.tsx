import { skills } from '../../data'
import { SectionHeader, HudCard, TechBadge } from './ui'

const CATEGORIES: { key: keyof typeof skills; label: string; accent: 'cyan' | 'purple' | 'magenta' | 'amber' | 'green' }[] = [
  { key: 'genAi', label: 'GenAI & Agents', accent: 'purple' },
  { key: 'mlDl', label: 'ML / Deep Learning', accent: 'cyan' },
  { key: 'systems', label: 'Systems & Tools', accent: 'magenta' },
  { key: 'cloud', label: 'Cloud', accent: 'cyan' },
  { key: 'languages', label: 'Languages', accent: 'amber' },
  { key: 'domains', label: 'Domains', accent: 'green' },
]

export function SkillsSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="skills"
          label="Module 02"
          title="Skill Matrix"
          subtitle="JARVIS-class capabilities across the full AI engineering stack."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ key, label, accent }) => (
            <HudCard key={key} accent={accent}>
              <p className="font-display text-xs tracking-[0.2em] text-jarvis-muted uppercase">{label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills[key].map((skill) => (
                  <TechBadge key={skill}>{skill}</TechBadge>
                ))}
              </div>
            </HudCard>
          ))}

          <HudCard accent="cyan" className="sm:col-span-2 lg:col-span-3">
            <p className="font-display text-xs tracking-[0.2em] text-jarvis-muted uppercase">Core Stack Flow</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm md:gap-3">
              {['Python', 'PyTorch', 'LangChain', 'RAG', 'Agentic AI', 'FastAPI', 'Docker', 'Production'].map(
                (node, i, arr) => (
                  <span key={node} className="flex items-center gap-2">
                    <span className="tech-tag">{node}</span>
                    {i < arr.length - 1 && <span className="text-jarvis-cyan/50">→</span>}
                  </span>
                ),
              )}
            </div>
          </HudCard>
        </div>
      </div>
    </section>
  )
}
