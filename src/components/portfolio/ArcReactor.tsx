export function ArcReactor({ size = 120 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="spin-slow absolute rounded-full border border-jarvis-cyan/20"
        style={{ width: size, height: size }}
      />
      <div
        className="spin-slow absolute rounded-full border border-dashed border-jarvis-cyan/30"
        style={{ width: size * 0.75, height: size * 0.75, animationDirection: 'reverse', animationDuration: '12s' }}
      />
      <div
        className="arc-reactor absolute rounded-full border-2 border-jarvis-cyan/60 bg-jarvis-cyan/10"
        style={{ width: size * 0.45, height: size * 0.45 }}
      >
        <div
          className="absolute inset-[25%] rounded-full bg-jarvis-cyan/80"
          style={{ boxShadow: '0 0 20px #00e5ff, 0 0 40px #00e5ff' }}
        />
      </div>
    </div>
  )
}
