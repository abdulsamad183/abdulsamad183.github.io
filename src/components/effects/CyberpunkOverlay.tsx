export function CyberpunkOverlay() {
  return (
    <div className="cyberpunk-overlay pointer-events-none fixed inset-0 z-20" aria-hidden>
      <div className="cyberpunk-vignette absolute inset-0" />
      <div className="cyberpunk-scanlines absolute inset-0" />
      <div className="cyberpunk-chromatic absolute inset-0" />
      <div className="cyberpunk-rain absolute inset-0" />
    </div>
  )
}
