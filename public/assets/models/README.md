# Samad City — 3D Assets

Real building models from **Kenney City Kit (Commercial)** — [CC0 license](https://kenney.nl/assets/city-kit-commercial).

## Install / refresh assets

```bash
curl -sL "https://opengameart.org/sites/default/files/kenney_city-kit-commercial_2.1.zip" -o /tmp/kenney-commercial.zip
npm run setup:assets
```

## Main portfolio buildings

| File | Building |
|------|----------|
| `building-city-core.glb` | City Core (welcome) |
| `building-projects.glb` | Projects (all projects inside) |
| `building-publications.glb` | Publications |
| `building-experience.glb` | Experience |
| `building-education.glb` | Education |
| `building-resume.glb` | Resume |
| `building-contact.glb` | Contact |

Replace any file with a **higher-quality GLB using the same filename** — no code changes required.

## Skyline & props

`building-skyline-*.glb` — background cityscape  
`prop-*.glb` — street furniture

Scene placement: `src/config/sceneLayout.ts`
