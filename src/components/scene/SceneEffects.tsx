import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function SceneEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.8}
        luminanceThreshold={0.12}
        luminanceSmoothing={0.92}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0008, 0.0008]}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.12} darkness={0.85} />
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  )
}
