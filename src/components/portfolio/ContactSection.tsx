import { profile } from '../../data'
import { SectionHeader, HudCard, HudButton } from './ui'

export function ContactSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="contact"
          label="Module 07"
          title="Transmission Hub"
          subtitle="Open a secure channel. JARVIS will route your message."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <HudCard accent="magenta">
            <p className="font-display text-xs tracking-[0.25em] text-jarvis-magenta uppercase">Direct Comms</p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 block text-lg text-jarvis-cyan transition hover:text-white"
                >
                  {profile.email}
                </a>
              </div>
              <div>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">Location</p>
                <p className="mt-1 text-lg text-jarvis-text">{profile.location}</p>
              </div>
              <div>
                <p className="text-xs tracking-wider text-jarvis-muted uppercase">Resumes</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.resumes.map((r) => (
                    <HudButton key={r.id} href={r.url} variant="ghost">
                      {r.label}
                    </HudButton>
                  ))}
                </div>
              </div>
            </div>
          </HudCard>

          <HudCard accent="cyan">
            <p className="font-display text-xs tracking-[0.25em] text-jarvis-cyan uppercase">Network Links</p>
            <div className="mt-6 grid gap-3">
              {[
                { label: 'LinkedIn', href: profile.links.linkedin },
                { label: 'GitHub', href: profile.links.github },
                { label: 'LeetCode', href: profile.links.leetcode },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-jarvis-cyan/30 hover:bg-jarvis-cyan/5"
                >
                  <span className="font-display text-sm tracking-wider text-jarvis-text uppercase group-hover:text-jarvis-cyan">
                    {link.label}
                  </span>
                  <span className="text-jarvis-muted group-hover:text-jarvis-cyan">↗</span>
                </a>
              ))}
            </div>
          </HudCard>
        </div>
      </div>
    </section>
  )
}
