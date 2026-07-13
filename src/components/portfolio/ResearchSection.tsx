import { publications } from '../../data'
import { SectionHeader, HudCard, ExternalLink } from './ui'

export function ResearchSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="research"
          label="Module 05"
          title="Research Archive"
          subtitle="Peer-reviewed publications and preprints in medical AI and deep learning."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {publications.map((pub, i) => (
            <HudCard key={pub.url} accent={i === 0 ? 'cyan' : 'purple'}>
              <p className="font-display text-xs tracking-widest text-jarvis-cyan uppercase">
                {pub.venue.includes('IEEE') ? 'IEEE Publication' : 'arXiv Preprint'}
              </p>
              <h3 className="mt-3 text-lg leading-snug font-semibold text-jarvis-text">{pub.title}</h3>
              <p className="mt-3 text-sm text-jarvis-muted">{pub.authors}</p>
              <p className="mt-2 text-xs text-jarvis-muted/80">{pub.venue}</p>
              <div className="mt-5">
                <ExternalLink href={pub.url}>Read Paper</ExternalLink>
              </div>
            </HudCard>
          ))}
        </div>
      </div>
    </section>
  )
}
