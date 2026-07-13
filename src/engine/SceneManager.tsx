import { BuildingManager } from './BuildingManager'
import { LightingManager } from './LightingManager'
import { AnimationManager } from './AnimationManager'
import { CityEnvironment } from '../effects/CityEnvironment'
import { CyberpunkProps } from '../effects/CyberpunkProps'
import { EntryPostProcessing } from '../effects/EntryPostProcessing'

/** AAA entry scene — asset-driven, no procedural buildings */
export function SceneManager() {
  return (
    <>
      <LightingManager />
      <CityEnvironment />
      <CyberpunkProps />
      <BuildingManager />
      <AnimationManager />
      <EntryPostProcessing />
    </>
  )
}
