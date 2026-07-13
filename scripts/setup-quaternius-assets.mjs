#!/usr/bin/env node
/**
 * Installs Quaternius Cyberpunk Game Kit assets (CC0).
 * Source zip: Cyberpunk Game Kit - Quaternius
 *   npm run setup:quaternius
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BUILDINGS_OUT = path.join(ROOT, 'public/assets/buildings')
const PROPS_OUT = path.join(ROOT, 'public/assets/props')
const TEXTURES_OUT = path.join(ROOT, 'public/assets/textures')

const ZIP =
  process.env.QUATERNIUS_ZIP ??
  '/mnt/c/Users/hp/Downloads/Cyberpunk Game Kit - Quaternius-20260713T144405Z-2-001.zip'

const KIT_PREFIX = 'Cyberpunk Game Kit - Quaternius'

/** Quaternius GLTF → semantic building GLB */
const BUILDING_MAP = {
  'Platforms/Platform_4x4.gltf': 'ai_core_tower.glb',
  'Platforms/Platform_4x2.gltf': 'projects_hq.glb',
  'Platforms/Computer_Large.gltf': 'research_institute.glb',
  'Platforms/AC_Stacked.gltf': 'experience_district.glb',
  'Platforms/Sign_Corner_1.gltf': 'education_center.glb',
  'Platforms/Platform_4x1.gltf': 'resume_center.glb',
  'Platforms/Sign_Corner_3_Fenced.gltf': 'contact_tower.glb',
  'Platforms/AC.gltf': 'skyline_a.glb',
  'Platforms/Platform_2x2.gltf': 'skyline_b.glb',
  'Platforms/AC_Side.gltf': 'skyline_c.glb',
  'Platforms/Sign_Corner_2.gltf': 'skyline_d.glb',
  'Platforms/Sign_Small_2.gltf': 'skyline_e.glb',
  'Platforms/Computer.gltf': 'skyline_f.glb',
  'Platforms/Sign_Corner_Hazard.gltf': 'skyline_g.glb',
  'Platforms/Platform_2x2_Empty.gltf': 'skyline_h.glb',
}

/** Environment + interior props */
const PROP_MAP = {
  'Platforms/Light_Street_1.gltf': 'light_street_1.glb',
  'Platforms/Light_Street_2.gltf': 'light_street_2.glb',
  'Platforms/Pipe_1.gltf': 'pipe_1.glb',
  'Platforms/Pipe_Corner.gltf': 'pipe_corner.glb',
  'Platforms/Antenna_1.gltf': 'antenna_1.glb',
  'Platforms/Antenna_2.gltf': 'antenna_2.glb',
  'Platforms/Rail_Long.gltf': 'rail_long.glb',
  'Platforms/Fence.gltf': 'fence.glb',
  'Platforms/Platform_2x1_Empty.gltf': 'platform_tile.glb',
  'Platforms/Light_Square.gltf': 'light_square.glb',
  'Enemies/Enemy_Flying.gltf': 'drone.glb',
}

const INTERIOR_OUT = path.join(ROOT, 'public/assets/interior')

/** Interior room GLBs */
const INTERIOR_MAP = {
  'Platforms/Computer.gltf': 'computer.glb',
  'Platforms/Computer_Large.gltf': 'computer_large.glb',
  'Platforms/TV_1.gltf': 'tv_1.glb',
  'Platforms/TV_2.gltf': 'tv_2.glb',
  'Platforms/TV_3.gltf': 'tv_3.glb',
  'Pickups and Objects/Lootbox.gltf': 'lootbox.glb',
  'Pickups and Objects/Collectible_Board.gltf': 'collectible_board.glb',
  'Pickups and Objects/Tank.gltf': 'tank.glb',
  'Platforms/Sign_Small_1.gltf': 'sign_small_1.glb',
  'Platforms/Sign_Small_2.gltf': 'sign_small_2.glb',
  'Enemies/Turret_Teleporter.gltf': 'hologram_pod.glb',
  'Platforms/AC.gltf': 'ac_unit.glb',
  'Platforms/AC_Side.gltf': 'ac_side.glb',
  'Platforms/Light_Street_1.gltf': 'light_street.glb',
  'Platforms/Platform_4x4_Empty.gltf': 'floor_platform.glb',
  'Platforms/Platform_2x2_Empty.gltf': 'wall_panel.glb',
}

function extractGltf(zipPath, innerPath, destGltf) {
  fs.mkdirSync(path.dirname(destGltf), { recursive: true })
  execSync(`unzip -p "${zipPath}" "${KIT_PREFIX}/${innerPath}" > "${destGltf}"`, { stdio: 'pipe' })
}

function gltfToGlb(srcGltf, destGlb) {
  fs.mkdirSync(path.dirname(destGlb), { recursive: true })
  execSync(`npx --yes @gltf-transform/cli@3 copy "${srcGltf}" "${destGlb}"`, {
    stdio: 'pipe',
    cwd: ROOT,
  })
}

if (!fs.existsSync(ZIP)) {
  console.error(`Missing zip: ${ZIP}`)
  console.error('Set QUATERNIUS_ZIP env var to the download path.')
  process.exit(1)
}

fs.mkdirSync(BUILDINGS_OUT, { recursive: true })
fs.mkdirSync(PROPS_OUT, { recursive: true })
fs.mkdirSync(INTERIOR_OUT, { recursive: true })

const tmpDir = path.join(ROOT, '.tmp-quaternius')
fs.mkdirSync(tmpDir, { recursive: true })

console.log('Converting Quaternius Cyberpunk buildings…')
for (const [src, dest] of Object.entries(BUILDING_MAP)) {
  const tmpGltf = path.join(tmpDir, path.basename(src))
  const outGlb = path.join(BUILDINGS_OUT, dest)
  extractGltf(ZIP, src, tmpGltf)
  gltfToGlb(tmpGltf, outGlb)
  console.log(`  ✓ ${dest} ← ${path.basename(src)}`)
}

console.log('\nConverting environment props…')
for (const [src, dest] of Object.entries(PROP_MAP)) {
  const tmpGltf = path.join(tmpDir, path.basename(src))
  const outGlb = path.join(PROPS_OUT, dest)
  extractGltf(ZIP, src, tmpGltf)
  gltfToGlb(tmpGltf, outGlb)
  console.log(`  ✓ props/${dest}`)
}

console.log('\nConverting interior props…')
for (const [src, dest] of Object.entries(INTERIOR_MAP)) {
  const tmpGltf = path.join(tmpDir, `int-${path.basename(src)}`)
  const outGlb = path.join(INTERIOR_OUT, dest)
  extractGltf(ZIP, src, tmpGltf)
  gltfToGlb(tmpGltf, outGlb)
  console.log(`  ✓ interior/${dest}`)
}

// Copy textures + license
for (const tex of ['Texture_Sign.png']) {
  const dest = path.join(TEXTURES_OUT, tex)
  execSync(`unzip -p "${ZIP}" "${KIT_PREFIX}/Textures/${tex}" > "${dest}"`, { stdio: 'pipe' })
  console.log(`  ✓ textures/${tex}`)
}

const licenseDest = path.join(ROOT, 'public/assets/quaternius-LICENSE.txt')
execSync(`unzip -p "${ZIP}" "${KIT_PREFIX}/License.txt" > "${licenseDest}"`, { stdio: 'pipe' })

fs.rmSync(tmpDir, { recursive: true, force: true })
console.log('\nQuaternius Cyberpunk assets installed.')
