import type { ReactNode } from 'react'

export function SectionHeader({
  id,
  label,
  title,
  subtitle,
}: {
  id: string
  label: string
  title: string
  subtitle?: string
}) {
  return (
    <div id={id} className="mb-12 scroll-mt-28">
      <p className="font-display text-xs tracking-[0.35em] text-jarvis-cyan uppercase">{label}</p>
      <h2 className="font-display mt-2 text-3xl font-bold text-jarvis-text md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-jarvis-muted">{subtitle}</p>}
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-jarvis-cyan to-transparent" />
    </div>
  )
}

export function HudCard({
  children,
  className = '',
  accent = 'cyan',
}: {
  children: ReactNode
  className?: string
  accent?: 'cyan' | 'purple' | 'magenta' | 'amber' | 'green'
}) {
  const accentMap = {
    cyan: 'hover:border-jarvis-cyan/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]',
    purple: 'hover:border-jarvis-purple/40 hover:shadow-[0_0_30px_rgba(176,38,255,0.08)]',
    magenta: 'hover:border-jarvis-magenta/40 hover:shadow-[0_0_30px_rgba(255,32,121,0.08)]',
    amber: 'hover:border-jarvis-amber/40 hover:shadow-[0_0_30px_rgba(255,183,3,0.08)]',
    green: 'hover:border-jarvis-green/40 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)]',
  }

  return (
    <div
      className={`hud-panel rounded-sm p-5 transition-all duration-300 md:p-6 ${accentMap[accent]} ${className}`}
    >
      {children}
    </div>
  )
}

export function TechBadge({ children }: { children: ReactNode }) {
  return <span className="tech-tag">{children}</span>
}

export function StatusPill({ label, online = true }: { label: string; online?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs tracking-wider text-jarvis-muted uppercase">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${online ? 'bg-jarvis-green status-dot' : 'bg-jarvis-muted'}`}
      />
      {label}
    </div>
  )
}

export function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm text-jarvis-cyan transition hover:text-white ${className}`}
    >
      {children}
      <span className="text-xs opacity-60">↗</span>
    </a>
  )
}

export function HudButton({
  href,
  children,
  variant = 'primary',
  onClick,
}: {
  href?: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
}) {
  const base =
    'font-display inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-200'
  const styles =
    variant === 'primary'
      ? 'border border-jarvis-cyan/50 bg-jarvis-cyan/10 text-jarvis-cyan hover:bg-jarvis-cyan/20 hover:shadow-[0_0_24px_rgba(0,229,255,0.25)]'
      : 'border border-white/10 bg-white/5 text-jarvis-muted hover:border-jarvis-cyan/30 hover:text-jarvis-cyan'

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${base} ${styles}`}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  )
}
