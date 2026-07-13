import {
  EffectComposer,
  Bloom,
  SSAO,
  Vignette,
  ChromaticAberration,
  ToneMapping,
  FXAA,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function EntryPostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <SSAO intensity={25} radius={0.12} luminanceInfluence={0.4} />
      <Bloom intensity={1.4} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0004, 0.0004]} radialModulation={false} modulationOffset={0} />
      <ToneMapping />
      <Vignette eskil={false} offset={0.15} darkness={0.65} />
      <FXAA />
    </EffectComposer>
  )
}
