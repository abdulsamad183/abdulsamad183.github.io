import { profile } from '../../data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-jarvis-cyan/10 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-sm tracking-[0.2em] text-jarvis-cyan uppercase">
            J.A.R.V.I.S. Portfolio Interface
          </p>
          <p className="mt-1 text-sm text-jarvis-muted">
            © {year} {profile.name}. All systems nominal.
          </p>
        </div>
        <p className="font-display text-xs tracking-[0.3em] text-jarvis-muted/60 uppercase">
          GenAI · RAG · Agentic AI
        </p>
      </div>
    </footer>
  )
}
