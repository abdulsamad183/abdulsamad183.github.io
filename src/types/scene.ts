import type { DistrictId } from './city'

/** Registry keys — maps 1:1 to filenames in public/assets/models/ */
export type AssetId =
  | 'building-city-core'
  | 'building-projects'
  | 'building-publications'
  | 'building-experience'
  | 'building-education'
  | 'building-resume'
  | 'building-contact'
  | 'building-skyline-a'
  | 'building-skyline-b'
  | 'building-skyline-c'
  | 'building-skyline-d'
  | 'building-skyline-e'
  | 'building-skyline-f'
  | 'building-skyline-g'
  | 'building-skyline-h'
  | 'prop-parasol'
  | 'prop-awning'

export type SceneObjectType = 'building' | 'prop'

export type Vec3 = [number, number, number]

export interface BuildingInteraction {
  districtId: DistrictId
  label: string
  color: string
  explorable: boolean
  hasPanel: boolean
  /** Invisible click bounds [width, height, depth] */
  hitbox: Vec3
}

interface SceneObjectBase {
  id: string
  type: SceneObjectType
  asset: AssetId
  position: Vec3
  rotation?: Vec3
  scale?: number | Vec3
  /** Align model base to ground (y=0) using bounding box */
  groundAlign?: boolean
}

export interface BuildingSceneObject extends SceneObjectBase {
  type: 'building'
  interaction?: BuildingInteraction
}

export interface PropSceneObject extends SceneObjectBase {
  type: 'prop'
}

export type SceneObject = BuildingSceneObject | PropSceneObject

export interface CitySceneLayout {
  objects: SceneObject[]
}
