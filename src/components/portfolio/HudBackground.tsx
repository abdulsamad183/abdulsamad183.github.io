export function HudBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="jarvis-grid absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 229, 255, 0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(176, 38, 255, 0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 10% 90%, rgba(255, 32, 121, 0.04) 0%, transparent 50%)',
        }}
      />
      <div className="scanline-overlay absolute inset-0" />
      <div className="scan-sweep absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-jarvis-cyan/10 to-transparent" />
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-jarvis-cyan/30 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-jarvis-purple/20 to-transparent" />
    </div>
  )
}
