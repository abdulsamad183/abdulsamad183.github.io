import { useEffect, useState } from 'react'
import { bootSequence } from '../data'
import { useCityStore } from '../store/cityStore'

const LINE_DELAY = 550
const FINAL_DELAY = 1200

export function BootScreen() {
  const completeBoot = useCityStore((s) => s.completeBoot)
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showEnter, setShowEnter] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (visibleLines < bootSequence.lines.length) {
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1)
        setProgress(Math.round(((visibleLines + 1) / bootSequence.lines.length) * 100))
      }, LINE_DELAY)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setShowEnter(true), FINAL_DELAY)
    return () => clearTimeout(t)
  }, [visibleLines])

  useEffect(() => {
    if (!showEnter) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setReady(true)
        completeBoot()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showEnter, completeBoot])

  if (ready) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#040818] via-[#060a14] to-[#0a1020]">
      <div className="cyber-vignette pointer-events-none absolute inset-0" />
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="mb-8 text-center">
          <p className="font-display text-xs tracking-[0.35em] text-city-cyan uppercase glow-cyan">{bootSequence.version}</p>
          <h1 className="font-display mt-3 text-2xl font-bold tracking-wider text-white md:text-3xl">
            {bootSequence.welcome}
          </h1>
          <p className="mt-2 text-sm text-slate-400">{bootSequence.subtitle}</p>
        </div>

        <div className="panel-glass glow-border rounded-xl p-6 font-mono text-sm">
          <div className="space-y-2">
            {bootSequence.lines.slice(0, visibleLines).map((line: string, i: number) => (
              <p key={line} className="fade-in flex gap-2" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="text-city-magenta">&gt;</span>
                <span className="text-slate-300">{line}</span>
              </p>
            ))}
          </div>

          {visibleLines >= bootSequence.lines.length && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Initializing Samad City</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-city-cyan to-city-purple transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {showEnter && (
          <button
            type="button"
            onClick={() => {
              setReady(true)
              completeBoot()
            }}
            className="fade-in font-display pulse-glow mt-8 w-full cursor-pointer rounded-xl border border-city-cyan/40 bg-city-cyan/10 px-6 py-4 text-sm font-semibold tracking-[0.2em] text-city-cyan transition hover:bg-city-cyan/20"
          >
            Press Enter — Enter Samad City
          </button>
        )}
      </div>
    </div>
  )
}
