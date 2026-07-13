import { CityProp } from '../effects/CityProp'
import type { DistrictBuildingConfig } from '../config/cityLayout'

/** Quaternius cyberpunk props at building base */
export function BuildingDecor({ config }: { config: DistrictBuildingConfig }) {
  const [x, , z] = config.position
  const accent = config.accent

  return (
    <group>
      <CityProp
        asset="light_street_1"
        position={[x + 5, 0, z + 3]}
        rotation={[0, -0.8, 0]}
        scale={1.4}
        emissive={accent}
      />
      <CityProp
        asset="pipe_1"
        position={[x - 4, 0, z - 2]}
        rotation={[0, 1.2, 0]}
        scale={1.6}
        emissive="#b026ff"
      />
      <CityProp
        asset="antenna_1"
        position={[x + 3, 0, z - 4]}
        scale={1.2}
        emissive={accent}
      />
    </group>
  )
}
