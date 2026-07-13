import { profile } from '../../data'
import { PanelShell } from './PanelShell'

export function ResumePanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell
      subtitle="Resume Center // CV Downloads"
      title="Resume"
      accentText="text-city-cyan"
      accentBorder="border-city-cyan/40"
      onClose={onClose}
    >
      <p className="mb-4 text-sm text-city-muted">
        {profile.name} — {profile.title}
      </p>
      <p className="mb-6 text-sm text-city-text/85">{profile.tagline}</p>

      <div className="space-y-3">
        {profile.resumes.map((r) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-city-cyan/30 bg-city-cyan/5 px-4 py-3 transition hover:border-city-cyan/60 hover:bg-city-cyan/10"
          >
            <span className="font-display font-semibold text-city-text">{r.label}</span>
            <span className="text-xs text-city-cyan">Download →</span>
          </a>
        ))}
      </div>

      <a
        href={profile.links.resumeFolder}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display mt-6 inline-block w-full rounded border border-city-amber/40 bg-city-amber/10 py-3 text-center text-xs tracking-wider text-city-amber uppercase hover:bg-city-amber/20"
      >
        Open Resume Folder (Google Drive)
      </a>
    </PanelShell>
  )
}
