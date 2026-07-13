export function LightOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
      <div className="light-vignette absolute inset-0" />
    </div>
  )
}
