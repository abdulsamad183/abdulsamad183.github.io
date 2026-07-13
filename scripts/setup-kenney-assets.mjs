#!/usr/bin/env node
/**
 * Extracts Kenney City Kit (Commercial) GLBs into semantic filenames.
 * Source: CC0 — https://kenney.nl/assets/city-kit-commercial
 * Run after placing kenney_city-kit-commercial_2.1.zip at /tmp/kenney-commercial.zip
 *   curl -sL "https://opengameart.org/sites/default/files/kenney_city-kit-commercial_2.1.zip" -o /tmp/kenney-commercial.zip
 *   npm run setup:assets
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../public/assets/models')
const ZIP = process.env.KENNEY_ZIP ?? '/tmp/kenney-commercial.zip'

/** Kenney source file → semantic asset name used by assetRegistry */
const COPY_MAP = {
  'building-skyscraper-d.glb': 'building-city-core.glb',
  'building-skyscraper-a.glb': 'building-projects.glb',
  'building-k.glb': 'building-publications.glb',
  'building-l.glb': 'building-experience.glb',
  'building-i.glb': 'building-education.glb',
  'building-f.glb': 'building-resume.glb',
  'building-g.glb': 'building-contact.glb',
  'low-detail-building-a.glb': 'building-skyline-a.glb',
  'low-detail-building-b.glb': 'building-skyline-b.glb',
  'low-detail-building-c.glb': 'building-skyline-c.glb',
  'low-detail-building-d.glb': 'building-skyline-d.glb',
  'low-detail-building-e.glb': 'building-skyline-e.glb',
  'low-detail-building-f.glb': 'building-skyline-f.glb',
  'building-skyscraper-b.glb': 'building-skyline-g.glb',
  'building-skyscraper-c.glb': 'building-skyline-h.glb',
  'detail-parasol-a.glb': 'prop-parasol.glb',
  'detail-awning.glb': 'prop-awning.glb',
}

if (!fs.existsSync(ZIP)) {
  console.error(`Missing ${ZIP}. Download Kenney City Kit Commercial first.`)
  process.exit(1)
}

fs.mkdirSync(OUT, { recursive: true })

for (const [src, dest] of Object.entries(COPY_MAP)) {
  const srcPath = `Models/GLB format/${src}`
  const tmp = path.join(OUT, `.tmp-${dest}`)
  execSync(`unzip -p "${ZIP}" "${srcPath}" > "${tmp}"`, { stdio: 'pipe' })
  fs.renameSync(tmp, path.join(OUT, dest))
  console.log(`  ✓ ${dest}`)
}

// Remove old placeholder box GLBs
const legacy = [
  'building-spire.glb',
  'building-block.glb',
  'building-layered.glb',
  'building-wide.glb',
  'building-tower-ai-core.glb',
  'road-ground.glb',
  'road-avenue.glb',
  'road-cross.glb',
  'road-sidewalk.glb',
  'vehicle-drone.glb',
  'street-lamp.glb',
  'tree-cyber.glb',
  'hologram-sign.glb',
]
for (const f of legacy) {
  const p = path.join(OUT, f)
  if (fs.existsSync(p)) {
    fs.unlinkSync(p)
    console.log(`  − removed placeholder ${f}`)
  }
}

console.log('\nKenney CC0 building assets installed.')
