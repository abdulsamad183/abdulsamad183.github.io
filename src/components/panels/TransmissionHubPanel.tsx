import { useState, type FormEvent } from 'react'
import { profile } from '../../data'
import { PanelShell } from './PanelShell'

const CONTACT_LINKS = [
  { label: 'Email', href: `mailto:${profile.email}`, value: profile.email },
  { label: 'LinkedIn', href: profile.links.linkedin, value: 'shaikabdulsamad-iit9' },
  { label: 'GitHub', href: profile.links.github, value: 'abdulsamad183' },
  { label: 'LeetCode', href: profile.links.leetcode, value: 'abdulsamadshaik183' },
  { label: 'Linktree', href: profile.links.linktree, value: 'shaikabdulsamad' },
]

export function TransmissionHubPanel({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    console.log('Contact form:', data)
    setSubmitted(true)
  }

  return (
    <PanelShell
      subtitle="Transmission Hub // Contact Node"
      title="Establish Connection"
      accentText="text-city-amber"
      accentBorder="border-city-amber/40"
      onClose={onClose}
      wide
    >
      <p className="mb-6 text-sm text-city-muted">
        Send a signal to the architect of Samad City. All channels are open.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact links */}
        <div className="space-y-3">
          <h3 className="font-display text-xs tracking-widest text-city-cyan uppercase">Direct Channels</h3>
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === 'Email' ? undefined : '_blank'}
              rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
              className="flex items-center justify-between rounded-lg border border-city-muted/20 bg-city-bg/40 px-4 py-3 transition hover:border-city-amber/40 hover:bg-city-amber/5"
            >
              <span className="text-sm font-medium text-city-text">{link.label}</span>
              <span className="text-xs text-city-muted">{link.value}</span>
            </a>
          ))}

          <div className="mt-4 rounded-lg border border-city-amber/20 bg-city-amber/5 p-4">
            <p className="font-display text-xs tracking-widest text-city-amber uppercase">Resume Downloads</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.resumes.map((resume) => (
                <a
                  key={resume.id}
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-city-amber/30 px-3 py-1.5 text-xs text-city-amber transition hover:bg-city-amber/10"
                >
                  {resume.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-city-muted/20 p-4">
            <p className="text-xs text-city-muted">Location</p>
            <p className="text-sm text-city-text">{profile.location}</p>
            <p className="mt-2 text-xs text-city-muted">Beyond code</p>
            <p className="text-sm text-city-text">{profile.funFacts.join(' · ')}</p>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h3 className="font-display mb-3 text-xs tracking-widest text-city-cyan uppercase">
            Send Transmission
          </h3>

          {submitted ? (
            <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-6 text-center">
              <p className="font-display text-lg font-bold text-emerald-400">Signal Received</p>
              <p className="mt-2 text-sm text-city-muted">
                Thank you for reaching out. I&apos;ll respond soon.
              </p>
              <p className="mt-4 text-xs text-city-muted">
                Or email directly:{' '}
                <a href={`mailto:${profile.email}`} className="text-city-cyan hover:underline">
                  {profile.email}
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs text-city-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-city-muted/30 bg-city-bg/60 px-3 py-2 text-sm text-city-text outline-none focus:border-city-amber/50 focus:ring-1 focus:ring-city-amber/30"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs text-city-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-city-muted/30 bg-city-bg/60 px-3 py-2 text-sm text-city-text outline-none focus:border-city-amber/50 focus:ring-1 focus:ring-city-amber/30"
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-1 block text-xs text-city-muted">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  className="w-full rounded-lg border border-city-muted/30 bg-city-bg/60 px-3 py-2 text-sm text-city-text outline-none focus:border-city-amber/50 focus:ring-1 focus:ring-city-amber/30"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-xs text-city-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me more..."
                  className="w-full resize-none rounded-lg border border-city-muted/30 bg-city-bg/60 px-3 py-2 text-sm text-city-text outline-none focus:border-city-amber/50 focus:ring-1 focus:ring-city-amber/30"
                />
              </div>
              <button
                type="submit"
                className="font-display w-full cursor-pointer rounded-lg border border-city-amber/40 bg-city-amber/10 py-3 text-xs tracking-widest text-city-amber uppercase transition hover:bg-city-amber/20 hover:shadow-[0_0_16px_rgba(255,176,32,0.2)]"
              >
                Transmit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </PanelShell>
  )
}
