#!/usr/bin/env node
/**
 * Restores vertical Kenney skyscraper GLBs as district buildings.
 * Quaternius platform tiles are flat — use Kenney for visible towers.
 * Quaternius props still used for city decoration + interiors.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MODELS = path.join(__dirname, '../public/assets/models')
const BUILDINGS = path.join(__dirname, '../public/assets/buildings')

const COPY_MAP = {
  'building-city-core.glb': 'ai_core_tower.glb',
  'building-projects.glb': 'projects_hq.glb',
  'building-publications.glb': 'research_institute.glb',
  'building-experience.glb': 'experience_district.glb',
  'building-education.glb': 'education_center.glb',
  'building-resume.glb': 'resume_center.glb',
  'building-contact.glb': 'contact_tower.glb',
  'building-skyline-a.glb': 'skyline_a.glb',
  'building-skyline-b.glb': 'skyline_b.glb',
  'building-skyline-c.glb': 'skyline_c.glb',
  'building-skyline-d.glb': 'skyline_d.glb',
  'building-skyline-e.glb': 'skyline_e.glb',
  'building-skyline-f.glb': 'skyline_f.glb',
  'building-skyline-g.glb': 'skyline_g.glb',
  'building-skyline-h.glb': 'skyline_h.glb',
}

fs.mkdirSync(BUILDINGS, { recursive: true })

for (const [src, dest] of Object.entries(COPY_MAP)) {
  const from = path.join(MODELS, src)
  const to = path.join(BUILDINGS, dest)
  if (!fs.existsSync(from)) {
    console.error(`Missing ${from} — run npm run setup:assets first`)
    process.exit(1)
  }
  fs.copyFileSync(from, to)
  console.log(`  ✓ ${dest}`)
}

console.log('\nVertical skyscraper buildings restored.')
