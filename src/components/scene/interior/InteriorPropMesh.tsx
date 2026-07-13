import type { InteriorPropType } from '../../../config/interiorContent'
import { INTERIOR_PROP_ASSET, INTERIOR_PROP_SCALE } from '../../../config/interiorAssets'
import { InteriorGltfProp } from './InteriorGltfProp'

const ACCENT: Record<InteriorPropType, string> = {
  monitor: '#00e5ff',
  bookshelf: '#b026ff',
  book: '#b026ff',
  frame: '#00e5ff',
  diploma: '#ffb703',
  folder: '#00e5ff',
  terminal: '#ff2079',
  crate: '#00e5ff',
  hologram: '#b026ff',
}

export function InteriorPropMesh({ type, hovered }: { type: InteriorPropType; hovered: boolean }) {
  const asset = INTERIOR_PROP_ASSET[type]
  const baseScale = INTERIOR_PROP_SCALE[type]
  const color = ACCENT[type]

  return (
    <InteriorGltfProp
      asset={asset}
      scale={baseScale * (hovered ? 1.06 : 1)}
      emissive={color}
      emissiveIntensity={hovered ? 0.55 : 0.18}
    />
  )
}
