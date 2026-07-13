import { experience, timeline } from '../../data'
import { PanelShell } from './PanelShell'

export function CareerTimelinePanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell
      subtitle="Experience District // Career Path"
      title="Career Timeline"
      accentText="text-city-muted"
      accentBorder="border-city-muted/40"
      onClose={onClose}
      wide
    >
      {/* Glowing timeline */}
      <div className="relative mb-8 py-4">
        <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-city-cyan/50 to-transparent" />
        <div className="relative flex justify-between gap-1 overflow-x-auto pb-2">
          {timeline.map((m, i) => (
            <div key={m.year} className="flex min-w-[72px] flex-col items-center">
              <div
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold ${
                  i === timeline.length - 1
                    ? 'border-city-magenta/50 bg-city-magenta/20 text-city-magenta'
                    : 'border-city-cyan/40 bg-city-cyan/10 text-city-cyan'
                }`}
              >
                {m.year.slice(2)}
              </div>
              <p className="mt-2 max-w-[80px] text-center text-[9px] leading-tight text-city-muted">
                {m.event}
              </p>
            </div>
          ))}
        </div>
      </div>

      <h3 className="font-display mb-4 text-xs tracking-widest text-city-cyan uppercase">
        Work Experience
      </h3>
      <div className="space-y-4">
        {experience.map((job) => (
          <div
            key={`${job.company}-${job.role}`}
            className="rounded-lg border border-city-muted/25 bg-city-bg/50 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-display font-semibold text-city-text">{job.role}</p>
                <p className="text-sm text-city-cyan">{job.company}</p>
              </div>
              <div className="text-right text-xs text-city-muted">
                <p>{job.period}</p>
                <p>{job.location}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {job.highlights.map((h) => (
                <li key={h} className="text-sm text-city-text/80">
                  ▸ {h}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-city-cyan/20 px-2 py-0.5 text-[10px] text-city-cyan"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  )
}
