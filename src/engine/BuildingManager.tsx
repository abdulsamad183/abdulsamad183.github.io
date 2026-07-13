import { DISTRICT_BUILDINGS } from '../config/cityLayout'
import { DistrictBuilding } from '../buildings/DistrictBuilding'
import { AICoreTower } from '../buildings/AICoreTower'
import { SkylineRing } from '../buildings/SkylineRing'
import { BuildingDecor } from '../buildings/BuildingDecor'

/** Maps district configs → building components */
export function BuildingManager() {
  const districts = DISTRICT_BUILDINGS.filter((d) => d.districtId !== 'city-core')

  return (
    <>
      <AICoreTower />
      {districts.map((config) => (
        <DistrictBuilding key={config.id} config={config} />
      ))}
      {districts.map((config) => (
        <BuildingDecor key={`decor-${config.id}`} config={config} />
      ))}
      <SkylineRing />
    </>
  )
}
