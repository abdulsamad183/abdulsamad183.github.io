import type { PropSceneObject } from '../../../types/scene'
import { CityAsset } from '../CityAsset'

export function Prop({ config }: { config: PropSceneObject }) {
  return (
    <CityAsset
      asset={config.asset}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
      groundAlign={config.groundAlign ?? true}
    />
  )
}
