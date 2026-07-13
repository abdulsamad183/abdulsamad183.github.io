import { flagshipProjects, publications } from '../../data'
import { PanelShell } from './PanelShell'

export function PublicationsPanel({ onClose }: { onClose: () => void }) {
  const thesis = flagshipProjects.find((p) => p.id === 'thesis')

  return (
    <PanelShell
      subtitle="Publications Archive // Research"
      title="Publications"
      accentText="text-city-magenta"
      accentBorder="border-city-magenta/40"
      onClose={onClose}
      wide
    >
      {thesis && (
        <div className="mb-6 rounded-lg border border-city-magenta/30 bg-city-magenta/5 p-5">
          <p className="font-display text-xs tracking-widest text-city-magenta uppercase">Master&apos;s Thesis</p>
          <h3 className="mt-2 font-display text-lg font-bold text-city-text">{thesis.name}</h3>
          <p className="mt-2 text-sm text-city-text/85">{thesis.description}</p>
          {thesis.links.publication && (
            <a
              href={thesis.links.publication}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display mt-4 inline-block rounded border border-city-amber/40 bg-city-amber/10 px-4 py-2 text-xs tracking-wider text-city-amber uppercase hover:bg-city-amber/20"
            >
              View arXiv Paper
            </a>
          )}
        </div>
      )}

      <h3 className="font-display mb-4 text-xs tracking-widest text-city-muted uppercase">Published Papers</h3>
      <div className="space-y-4">
        {publications.map((pub) => (
          <div key={pub.title} className="rounded-lg border border-city-muted/20 p-4 hover:border-city-magenta/30">
            <p className="font-semibold text-city-text">{pub.title}</p>
            <p className="mt-1 text-xs text-city-muted">{pub.authors}</p>
            <p className="mt-1 text-xs italic text-city-muted/80">{pub.venue}</p>
            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-city-cyan hover:underline">
              Read publication →
            </a>
          </div>
        ))}
      </div>
    </PanelShell>
  )
}
