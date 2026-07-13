import { useEffect, useState } from 'react'

const BOOT_LINES = [
  '> J.A.R.V.I.S. interface initializing...',
  '> Loading neural profile: Shaik Abdul Samad',
  '> Syncing project database...',
  '> Calibrating skill matrix...',
  '> Establishing secure link...',
  '> All systems operational.',
]

export function JarvisBoot({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]])
        i++
      } else {
        clearInterval(interval)
        setDone(true)
        setTimeout(onComplete, 600)
      }
    }, 380)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-jarvis-bg px-6"
      onClick={onComplete}
      onKeyDown={(e) => e.key === 'Enter' && onComplete()}
      role="button"
      tabIndex={0}
    >
      <div className="jarvis-grid absolute inset-0 opacity-40" />
      <div className="scanline-overlay absolute inset-0" />

      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-8 text-center">
          <p className="font-display text-xs tracking-[0.4em] text-jarvis-cyan uppercase">Just A Rather Very Intelligent System</p>
          <h1 className="font-display mt-3 text-2xl font-bold text-jarvis-text md:text-3xl">
            J<span className="text-jarvis-cyan">.</span>A<span className="text-jarvis-cyan">.</span>R<span className="text-jarvis-cyan">.</span>V<span className="text-jarvis-cyan">.</span>I<span className="text-jarvis-cyan">.</span>S<span className="text-jarvis-cyan">.</span>
          </h1>
        </div>

        <div className="hud-panel rounded-sm p-6 font-mono text-sm">
          {lines.map((line, idx) => (
            <p key={idx} className={`mb-1 ${idx === lines.length - 1 && !done ? 'text-jarvis-cyan' : 'text-jarvis-muted'}`}>
              {line}
              {idx === lines.length - 1 && !done && <span className="cursor-blink ml-1 text-jarvis-cyan">_</span>}
            </p>
          ))}
          {done && (
            <p className="mt-4 text-jarvis-cyan fade-up">
              Welcome. Portfolio interface ready.
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-xs tracking-widest text-jarvis-muted uppercase">
          Click or press Enter to skip
        </p>
      </div>
    </div>
  )
}
