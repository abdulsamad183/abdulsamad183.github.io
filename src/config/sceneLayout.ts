import type { CitySceneLayout } from '../types/scene'
import { EXPLORABLE_DISTRICTS, PANEL_DISTRICTS } from '../constants/districtCameras'

function districtInteraction(
  districtId: (typeof EXPLORABLE_DISTRICTS)[number],
  label: string,
  color: string,
  hitbox: [number, number, number],
) {
  return {
    districtId,
    label,
    color,
    explorable: EXPLORABLE_DISTRICTS.includes(districtId),
    hasPanel: PANEL_DISTRICTS.includes(districtId),
    hitbox,
  }
}

/**
 * Main portfolio buildings only — each maps to one GLB asset.
 */
export const sceneLayout: CitySceneLayout = {
  objects: [
    // ── Main buildings (portfolio sections) ─────────────────────────
    {
      id: 'bld-city-core',
      type: 'building',
      asset: 'building-city-core',
      position: [0, 0, 0],
      scale: 2.2,
      interaction: districtInteraction('city-core', 'Samad City', '#00f5ff', [4, 12, 4]),
    },
    {
      id: 'bld-projects',
      type: 'building',
      asset: 'building-projects',
      position: [-9, 0, -2],
      scale: 2,
      interaction: districtInteraction('projects', 'Projects', '#00f5ff', [3.5, 10, 3.5]),
    },
    {
      id: 'bld-publications',
      type: 'building',
      asset: 'building-publications',
      position: [9, 0, -2],
      scale: 2,
      interaction: districtInteraction('publications', 'Publications', '#b026ff', [3.5, 9, 3.5]),
    },
    {
      id: 'bld-experience',
      type: 'building',
      asset: 'building-experience',
      position: [0, 0, -10],
      scale: 2,
      interaction: districtInteraction('experience', 'Experience', '#7a8ba8', [3.5, 9, 3.5]),
    },
    {
      id: 'bld-education',
      type: 'building',
      asset: 'building-education',
      position: [-9, 0, 6],
      scale: 2,
      interaction: districtInteraction('education', 'Education', '#ffaa00', [3.5, 8, 3.5]),
    },
    {
      id: 'bld-resume',
      type: 'building',
      asset: 'building-resume',
      position: [9, 0, 6],
      scale: 2,
      interaction: districtInteraction('resume', 'Resume', '#00f5ff', [3, 7, 3]),
    },
    {
      id: 'bld-contact',
      type: 'building',
      asset: 'building-contact',
      position: [0, 0, 12],
      scale: 2,
      interaction: districtInteraction('contact', 'Contact', '#ff2079', [3, 7, 3]),
    },

    // ── Background skyline (decorative, non-interactive) ────────────
    { id: 'sky-a', type: 'building', asset: 'building-skyline-a', position: [-18, 0, -14], scale: 2.5, groundAlign: true },
    { id: 'sky-b', type: 'building', asset: 'building-skyline-b', position: [18, 0, -14], scale: 2.5 },
    { id: 'sky-c', type: 'building', asset: 'building-skyline-c', position: [-20, 0, 0], scale: 2.2 },
    { id: 'sky-d', type: 'building', asset: 'building-skyline-d', position: [20, 0, 0], scale: 2.2 },
    { id: 'sky-e', type: 'building', asset: 'building-skyline-e', position: [-16, 0, 14], scale: 2 },
    { id: 'sky-f', type: 'building', asset: 'building-skyline-f', position: [16, 0, 14], scale: 2 },
    { id: 'sky-g', type: 'building', asset: 'building-skyline-g', position: [-12, 0, -18], scale: 2.8 },
    { id: 'sky-h', type: 'building', asset: 'building-skyline-h', position: [12, 0, -18], scale: 2.8 },

    // ── Street props ────────────────────────────────────────────────
    { id: 'prop-1', type: 'prop', asset: 'prop-parasol', position: [-5, 0, 3], scale: 1.5 },
    { id: 'prop-2', type: 'prop', asset: 'prop-parasol', position: [5, 0, 3], scale: 1.5 },
    { id: 'prop-3', type: 'prop', asset: 'prop-awning', position: [-4, 0, -6], rotation: [0, 0.3, 0], scale: 1.5 },
    { id: 'prop-4', type: 'prop', asset: 'prop-awning', position: [4, 0, -6], rotation: [0, -0.3, 0], scale: 1.5 },
  ],
}
