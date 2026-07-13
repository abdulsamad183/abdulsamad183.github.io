import { sceneLayout } from '../../config/sceneLayout'
import type { SceneObject } from '../../types/scene'
import { Building } from './assets/Building'
import { Prop } from './assets/Prop'

function renderSceneObject(obj: SceneObject) {
  switch (obj.type) {
    case 'building':
      return <Building config={obj} />
    case 'prop':
      return <Prop config={obj} />
    default:
      return null
  }
}

export function SceneRenderer() {
  return <>{sceneLayout.objects.map((obj) => <group key={obj.id}>{renderSceneObject(obj)}</group>)}</>
}
