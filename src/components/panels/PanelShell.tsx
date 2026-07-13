import type { ReactNode } from 'react'

interface PanelShellProps {
  subtitle: string
  title: string
  accentText: string
  accentBorder: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

export function PanelShell({
  subtitle,
  title,
  accentText,
  accentBorder,
  onClose,
  children,
  wide,
}: PanelShellProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8">
      <div
        className={`panel-glass glow-border relative max-h-[90vh] w-full overflow-y-auto rounded-xl border-2 ${accentBorder} ${wide ? 'max-w-3xl' : 'max-w-xl'}`}
        role="dialog"
        aria-label={title}
      >
        <div className="sticky top-0 z-10 border-b border-city-cyan/10 bg-city-panel/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`font-display text-[10px] tracking-[0.3em] uppercase ${accentText}`}>
                {subtitle}
              </p>
              <h2 className="font-display mt-1 text-xl font-bold text-city-text md:text-2xl">{title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 cursor-pointer rounded border border-city-muted/40 px-3 py-1 text-xs text-city-muted hover:text-city-text"
            >
              ESC
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
