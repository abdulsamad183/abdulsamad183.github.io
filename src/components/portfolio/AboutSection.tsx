import { profile } from '../../data'
import { SectionHeader, HudCard } from './ui'

export function AboutSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="about"
          label="Module 01"
          title="Identity Profile"
          subtitle="AI Engineer building production GenAI systems — from RAG pipelines to multi-agent architectures."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <HudCard accent="cyan">
            <p className="font-display text-xs tracking-[0.25em] text-jarvis-cyan uppercase">Operator</p>
            <h3 className="mt-2 text-2xl font-semibold text-jarvis-text">{profile.name}</h3>
            <p className="mt-3 leading-relaxed text-jarvis-muted">
              I specialize in <strong className="text-jarvis-text">Agentic AI</strong>,{' '}
              <strong className="text-jarvis-text">RAG systems</strong>, and{' '}
              <strong className="text-jarvis-text">production GenAI</strong> at Infobell IT. Previously at Siemens
              working on Federated Learning and Computer Vision. M.Tech from IIT Dharwad with research in medical AI.
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
            <p className="font-display text-xs tracking-[0.25em] text-jarvis-purple uppercase">Mission Brief</p>
            <ul className="mt-4 space-y-3 text-jarvis-muted">
              <li className="flex gap-3">
                <span className="text-jarvis-cyan">▸</span>
                Build autonomous AI systems that solve real problems
              </li>
              <li className="flex gap-3">
                <span className="text-jarvis-cyan">▸</span>
                Ship production-grade RAG &amp; agentic pipelines
              </li>
              <li className="flex gap-3">
                <span className="text-jarvis-cyan">▸</span>
                Research deep learning for healthcare &amp; vision
              </li>
              <li className="flex gap-3">
                <span className="text-jarvis-cyan">▸</span>
                Open-source tools for the AI engineering community
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">Location</p>
                <p className="mt-1 text-jarvis-text">{profile.location}</p>
              </div>
              <div>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">Status</p>
                <p className="mt-1 text-jarvis-green">Available for opportunities</p>
              </div>
            </div>
          </HudCard>
        </div>
      </div>
    </section>
  )
}
