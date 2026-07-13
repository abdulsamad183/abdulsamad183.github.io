import { useState } from 'react'
import { skillTree } from '../../data'
import type { SkillNode } from '../../types/city'
import { PanelShell } from './PanelShell'

const CATEGORY_COLORS: Record<string, string> = {
  languages: 'border-city-cyan/50 bg-city-cyan/10 text-city-cyan',
  mlDl: 'border-city-magenta/40 bg-city-magenta/10 text-city-magenta',
  genAi: 'border-city-amber/40 bg-city-amber/10 text-city-amber',
  systems: 'border-city-muted/40 bg-city-muted/10 text-city-muted',
  domains: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-400',
}

function SkillNodeButton({
  node,
  selected,
  connected,
  onSelect,
}: {
  node: SkillNode
  selected: boolean
  connected: boolean
  onSelect: () => void
}) {
  const colorClass = CATEGORY_COLORS[node.category] ?? CATEGORY_COLORS.languages

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-medium transition ${
        selected
          ? `${colorClass} shadow-[0_0_12px_rgba(0,240,255,0.2)] ring-1 ring-white/20`
          : connected
            ? `${colorClass} opacity-80`
            : 'border-city-muted/20 bg-city-bg/40 text-city-muted hover:border-city-cyan/30'
      }`}
    >
      {node.label}
    </button>
  )
}

export function SkillsArenaPanel({ onClose }: { onClose: () => void }) {
  const [selectedId, setSelectedId] = useState<string>('python')

  const selected = skillTree.find((n) => n.id === selectedId)
  const connectedIds = new Set(selected?.connections ?? [])

  return (
    <PanelShell
      subtitle="Skills Arena // Neural Grid"
      title="Skill Tree"
      accentText="text-city-cyan"
      accentBorder="border-city-cyan/40"
      onClose={onClose}
      wide
    >
      <p className="mb-6 text-sm text-city-muted">
        Click a node to inspect connected skills and related projects.
      </p>

      {/* Visual skill tree layout */}
      <div className="mb-6 rounded-lg border border-city-cyan/15 bg-city-bg/60 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {skillTree
              .filter((n) => n.category === 'languages')
              .map((n) => (
                <SkillNodeButton
                  key={n.id}
                  node={n}
                  selected={selectedId === n.id}
                  connected={connectedIds.has(n.id)}
                  onSelect={() => setSelectedId(n.id)}
                />
              ))}
          </div>
          <div className="h-4 w-px bg-city-cyan/30" />
          <div className="flex flex-wrap justify-center gap-2">
            {skillTree
              .filter((n) => ['mlDl', 'systems'].includes(n.category))
              .map((n) => (
                <SkillNodeButton
                  key={n.id}
                  node={n}
                  selected={selectedId === n.id}
                  connected={connectedIds.has(n.id)}
                  onSelect={() => setSelectedId(n.id)}
                />
              ))}
          </div>
          <div className="h-4 w-px bg-city-cyan/30" />
          <div className="flex flex-wrap justify-center gap-2">
            {skillTree
              .filter((n) => n.category === 'genAi')
              .map((n) => (
                <SkillNodeButton
                  key={n.id}
                  node={n}
                  selected={selectedId === n.id}
                  connected={connectedIds.has(n.id)}
                  onSelect={() => setSelectedId(n.id)}
                />
              ))}
          </div>
          <div className="h-4 w-px bg-city-cyan/30" />
          <div className="flex flex-wrap justify-center gap-2">
            {skillTree
              .filter((n) => n.category === 'domains')
              .map((n) => (
                <SkillNodeButton
                  key={n.id}
                  node={n}
                  selected={selectedId === n.id}
                  connected={connectedIds.has(n.id)}
                  onSelect={() => setSelectedId(n.id)}
                />
              ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="rounded-lg border border-city-cyan/30 bg-city-cyan/5 p-5">
          <h3 className="font-display text-lg font-bold text-city-cyan">{selected.label}</h3>
          <p className="mt-1 text-xs tracking-wider text-city-muted uppercase">
            {selected.category.replace(/([A-Z])/g, ' $1').trim()}
          </p>

          {selected.connections.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-city-muted">Connected nodes</p>
              <div className="flex flex-wrap gap-2">
                {selected.connections.map((cid) => {
                  const conn = skillTree.find((n) => n.id === cid)
                  return conn ? (
                    <button
                      key={cid}
                      type="button"
                      onClick={() => setSelectedId(cid)}
                      className="cursor-pointer rounded border border-city-cyan/30 px-2 py-1 text-xs text-city-cyan hover:bg-city-cyan/10"
                    >
                      → {conn.label}
                    </button>
                  ) : null
                })}
              </div>
            </div>
          )}

          {selected.projects && selected.projects.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-city-muted">Used in projects</p>
              <ul className="space-y-1">
                {selected.projects.map((p) => (
                  <li key={p} className="text-sm text-city-text/90">
                    ◆ {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </PanelShell>
  )
}
