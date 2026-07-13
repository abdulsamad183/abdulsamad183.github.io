import { profile, careerTimeline } from '../../data'
import { ArcReactor } from './ArcReactor'
import { HudButton, StatusPill } from './ui'

export function Hero() {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <section id="hero" className="relative min-h-screen px-5 pt-28 pb-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div className="fade-up">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <StatusPill label="Systems Online" />
            <StatusPill label="Neural Core Active" />
            <span className="tech-tag border-jarvis-amber/40 bg-jarvis-amber/10 text-jarvis-amber">IITian</span>
            <span className="font-display text-xs tracking-widest text-jarvis-muted uppercase">
              {timeStr} · {profile.location}
            </span>
          </div>

          <p className="font-display text-xs tracking-[0.35em] text-jarvis-cyan uppercase">
            Good {now.getHours() < 12 ? 'morning' : now.getHours() < 17 ? 'afternoon' : 'evening'}.
          </p>

          <h1 className="font-display mt-4 text-4xl leading-tight font-black md:text-6xl lg:text-7xl">
            <span className="glow-text">{profile.name}</span>
          </h1>

          <p className="mt-4 text-xl text-jarvis-cyan md:text-2xl">{profile.title}</p>
          <p className="mt-3 max-w-xl text-lg text-jarvis-muted">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <HudButton href="#projects">View Projects</HudButton>
            <HudButton href={profile.links.resumeFolder} variant="ghost">
              Download CV
            </HudButton>
            <HudButton href={profile.links.github} variant="ghost">
              GitHub
            </HudButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Projects', value: '13+' },
              { label: 'Research', value: '2' },
              { label: 'Skills', value: '30+' },
              { label: 'Experience', value: '2+ yrs' },
            ].map((stat) => (
              <div key={stat.label} className="hud-panel rounded-sm px-4 py-3 text-center">
                <p className="font-display text-xl font-bold text-jarvis-cyan">{stat.value}</p>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex flex-col items-center">
          <ArcReactor size={200} />
          <div className="hud-panel mt-8 w-64 rounded-sm p-4">
            <p className="font-display text-[0.6rem] tracking-[0.3em] text-jarvis-muted uppercase">Career Timeline</p>
            <div className="mt-3 space-y-3">
              {careerTimeline.map((entry) => (
                <div key={`${entry.company}-${entry.period}`} className="text-sm">
                  <p className="font-display text-[0.65rem] tracking-wider text-jarvis-cyan">{entry.period}</p>
                  <p className="mt-0.5 text-jarvis-text">
                    {entry.company} — {entry.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl justify-center">
        <a href="#about" className="flex flex-col items-center gap-2 text-jarvis-muted transition hover:text-jarvis-cyan">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll to explore</span>
          <span className="animate-bounce text-jarvis-cyan">↓</span>
        </a>
      </div>
    </section>
  )
}
