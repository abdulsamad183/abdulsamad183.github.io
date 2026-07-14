import { profile } from '../../data'
import { SectionHeader, HudCard, HudButton } from './ui'

const HIRE_MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent('Opportunity — GenAI / Agentic AI')}`

export function AboutSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="about"
          label="Module 01"
          title="Identity Profile"
          subtitle="Production GenAI engineer — RAG, voice agents, and medical deep learning."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <HudCard accent="cyan">
            <p className="font-display text-xs tracking-[0.25em] text-jarvis-cyan uppercase">Operator</p>
            <h3 className="mt-2 text-2xl font-semibold text-jarvis-text">{profile.name}</h3>
            <p className="mt-3 leading-relaxed text-jarvis-muted">
              Software Engineer–AIML at Infobell IT building production <strong className="text-jarvis-text">RAG</strong>,{' '}
              <strong className="text-jarvis-text">voice agents</strong>, and AWS-deployed GenAI systems. Previously a
              Technical Intern at Siemens on federated learning and computer vision. M.Tech (IIT Dharwad) with published
              research in medical AI.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.funFacts.map((f) => (
                <span key={f} className="tech-tag">
                  {f}
                </span>
              ))}
            </div>
          </HudCard>

          <HudCard accent="purple">
            <p className="font-display text-xs tracking-[0.25em] text-jarvis-purple uppercase">Impact Highlights</p>
            <ul className="mt-4 space-y-3 text-sm text-jarvis-muted">
              <li className="flex gap-3">
                <span className="shrink-0 text-jarvis-cyan">▸</span>
                Cut LLM hallucinations ~35% with agentic RAG over 10,000+ documents; 92% Top-K precision, p95 &lt;800ms
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-jarvis-cyan">▸</span>
                Shipped sub-second voice agents (Vivah.ai, Mediflow) on FastAPI + AWS ECS Fargate
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-jarvis-cyan">▸</span>
                ~25% faster distributed training and ~20% accuracy gains at Siemens via FL + LoRA/QLoRA
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-jarvis-cyan">▸</span>
                M.Tech medical AI thesis — MRF-DCN ~96% classification accuracy on cervical cell analysis
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">Location</p>
                <p className="mt-1 text-jarvis-text">{profile.location}</p>
              </div>
              <div>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">Status</p>
                <p className="mt-1 text-jarvis-green">Open to GenAI / Agentic AI roles</p>
              </div>
            </div>
            <div className="mt-5">
              <HudButton href={HIRE_MAILTO}>Email me</HudButton>
            </div>
          </HudCard>
        </div>
      </div>
    </section>
  )
}
