import { flagshipProjects, publications } from '../../data'
import { PanelShell } from './PanelShell'

/** Combined Nexus Lab view with thesis + publications */
export function NexusLabFullPanel({ onClose }: { onClose: () => void }) {
  const thesis = flagshipProjects.find((p) => p.id === 'thesis')
  if (!thesis) return null

  return (
    <PanelShell
      subtitle="Nexus Lab // Research District"
      title="Research & Publications"
      accentText="text-city-cyan"
      accentBorder="border-city-cyan/40"
      onClose={onClose}
      wide
    >
      <div className="mb-6 rounded-lg border border-city-cyan/30 bg-city-cyan/5 p-5">
        <p className="font-display text-xs tracking-widest text-city-cyan uppercase">Master&apos;s Thesis</p>
        <h3 className="mt-2 font-display text-lg font-bold text-city-text">{thesis.name}</h3>
        <p className="mt-2 text-sm text-city-text/85">{thesis.description}</p>

        <ul className="mt-4 space-y-2">
          {thesis.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-city-text">
              <span className="text-city-cyan">◆</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {thesis.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-city-muted/30 px-2 py-1 text-xs text-city-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {thesis.links.publication && (
          <a
            href={thesis.links.publication}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display mt-4 inline-block rounded border border-city-amber/40 bg-city-amber/10 px-4 py-2 text-xs tracking-wider text-city-amber uppercase transition hover:bg-city-amber/20"
          >
            View arXiv Paper
          </a>
        )}
      </div>

      <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">
        Data Archive // Publications
      </h3>
      <div className="space-y-4">
        {publications.map((pub) => (
          <div
            key={pub.title}
            className="rounded-lg border border-city-muted/20 p-4 transition hover:border-city-cyan/30"
          >
            <p className="font-semibold text-city-text">{pub.title}</p>
            <p className="mt-1 text-xs text-city-muted">{pub.authors}</p>
            <p className="mt-1 text-xs italic text-city-muted/80">{pub.venue}</p>
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-city-cyan hover:underline"
            >
              Read publication →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-city-magenta/20 bg-city-magenta/5 p-4">
        <p className="font-display text-xs tracking-widest text-city-magenta uppercase">AI Core Interior</p>
        <p className="mt-2 text-sm text-city-text/80">
          Neural architecture research — segmentation, classification, and probabilistic risk assessment
          for early cervical cancer detection. MRF-DCN achieves ~96% accuracy with fewer parameters than SOTA.
        </p>
      </div>
    </PanelShell>
  )
}
