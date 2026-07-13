/**
 * Generates temporary placeholder GLB files for Samad City.
 * Replace any file in public/assets/models/ with a professional GLB — no code changes needed.
 *
 * Run: node scripts/generate-placeholder-assets.mjs
 */
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Polyfills for GLTFExporter in Node
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    result = null
    onloadend = null
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf
        this.onloadend?.()
      })
    }
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/assets/models')

const PLACEHOLDER = new THREE.MeshStandardMaterial({
  color: '#1a1030',
  emissive: '#6020a0',
  emissiveIntensity: 0.35,
  metalness: 0.85,
  roughness: 0.2,
})

const CYAN = new THREE.MeshStandardMaterial({
  color: '#0a1828',
  emissive: '#00f5ff',
  emissiveIntensity: 0.5,
  metalness: 0.9,
  roughness: 0.15,
})

const MAGENTA = new THREE.MeshStandardMaterial({
  color: '#180818',
  emissive: '#ff2079',
  emissiveIntensity: 0.45,
  metalness: 0.9,
  roughness: 0.15,
})

function mesh(geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const m = new THREE.Mesh(geometry, material)
  m.position.set(...position)
  m.rotation.set(...rotation)
  m.scale.set(...scale)
  return m
}

const MODEL_BUILDERS = {
  'building-spire': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.BoxGeometry(1.2, 4, 1.2), CYAN, [0, 2, 0]))
    g.add(mesh(new THREE.ConeGeometry(0.6, 1.5, 6), CYAN, [0, 4.75, 0]))
    return g
  },
  'building-block': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.BoxGeometry(2, 3.5, 1.8), PLACEHOLDER, [0, 1.75, 0]))
    return g
  },
  'building-layered': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.BoxGeometry(2.2, 1.2, 1.8), PLACEHOLDER, [0, 0.6, 0]))
    g.add(mesh(new THREE.BoxGeometry(1.8, 1.2, 1.5), CYAN, [0, 1.8, 0]))
    g.add(mesh(new THREE.BoxGeometry(1.4, 1.2, 1.2), MAGENTA, [0, 3, 0]))
    return g
  },
  'building-wide': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.BoxGeometry(3, 2, 2), PLACEHOLDER, [0, 1, 0]))
    return g
  },
  'building-tower-ai-core': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.BoxGeometry(2.8, 5, 2.8), CYAN, [0, 2.5, 0]))
    g.add(mesh(new THREE.BoxGeometry(2, 2, 2), MAGENTA, [0, 6, 0]))
    g.add(mesh(new THREE.ConeGeometry(0.5, 1.5, 8), CYAN, [0, 7.75, 0]))
    return g
  },
  'road-ground': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.PlaneGeometry(90, 90), PLACEHOLDER, [0, 0, 0], [-Math.PI / 2, 0, 0]))
    return g
  },
  'road-avenue': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.PlaneGeometry(4, 50), CYAN, [0, 0.01, 0], [-Math.PI / 2, 0, 0]))
    return g
  },
  'road-cross': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.PlaneGeometry(50, 4), MAGENTA, [0, 0.01, 0], [-Math.PI / 2, 0, 0]))
    return g
  },
  'road-sidewalk': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.BoxGeometry(0.15, 0.16, 48), PLACEHOLDER, [0, 0.08, 0]))
    return g
  },
  'vehicle-drone': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.BoxGeometry(0.25, 0.08, 0.12), PLACEHOLDER, [0, 0, 0]))
    g.add(mesh(new THREE.SphereGeometry(0.03, 6, 6), MAGENTA, [-0.18, 0, 0]))
    g.add(mesh(new THREE.SphereGeometry(0.03, 6, 6), CYAN, [0.18, 0, 0]))
    return g
  },
  'street-lamp': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.CylinderGeometry(0.04, 0.06, 3, 8), PLACEHOLDER, [0, 1.5, 0]))
    g.add(mesh(new THREE.SphereGeometry(0.12, 8, 8), CYAN, [0, 3.1, 0]))
    return g
  },
  'tree-cyber': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.8, 6), PLACEHOLDER, [0, 0.4, 0]))
    g.add(mesh(new THREE.ConeGeometry(0.5, 1.2, 6), CYAN, [0, 1.4, 0]))
    return g
  },
  'hologram-sign': () => {
    const g = new THREE.Group()
    g.add(mesh(new THREE.PlaneGeometry(1.2, 2), CYAN, [0, 1, 0]))
    return g
  },
}

async function exportGlb(name, scene) {
  const exporter = new GLTFExporter()
  const buffer = await exporter.parseAsync(scene, { binary: true })
  const outPath = path.join(OUT_DIR, `${name}.glb`)
  fs.writeFileSync(outPath, Buffer.from(buffer))
  console.log(`  ✓ ${name}.glb`)
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  console.log('Generating placeholder GLB assets → public/assets/models/\n')

  for (const [name, build] of Object.entries(MODEL_BUILDERS)) {
    const scene = build()
    scene.name = name
    await exportGlb(name, scene)
  }

  console.log('\nDone. Swap any .glb with a professional model — no code changes required.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
