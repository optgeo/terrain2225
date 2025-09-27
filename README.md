# terrain2225

terrain22, 2025 implementation with MapLibre GL JS

## Overview

This is the 2025 implementation of terrain22, a modern web mapping application built with MapLibre GL JS and deployed via GitHub Pages. This version includes several improvements over the original:

## Features

- **MapLibre GL JS**: Modern, performant web mapping library
- **Vite Build System**: Fast development and optimized production builds
- **3D Terrain Visualization**: Uses mapterhorn tiles for elevation and hillshading
- **No Transparency Polygons**: Terrain polygons are always rendered with full opacity (most dense expression)
- **GitHub Pages Deployment**: Automatic deployment to `optgeo.github.io/terrain2225`
- **Hash-free URLs**: Clean URLs without hash fragments
- **Globe Control**: Includes globe projection control (when available)

## Data Sources

The application uses TileJSON from:
- `https://tunnel.optgeo.org/martin/terrain22` - Terrain polygon data
- `https://tunnel.optgeo.org/martin/mapterhorn` - Elevation and hillshading data

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:5173/terrain2225/`

### Production Build

```bash
npm run build
```

Built files are output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

The application is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch. The deployment workflow:

1. Installs dependencies
2. Builds the application
3. Deploys to GitHub Pages

The live application is available at: `https://optgeo.github.io/terrain2225/`

## Technical Details

- **Framework**: Vanilla JavaScript with MapLibre GL JS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **Base Path**: `/terrain2225/`
- **Map Controls**: Navigation, Attribution, Globe (when available)
- **Initial Location**: Tokyo, Japan (139.7°E, 35.68°N)
- **Initial View**: Zoom 10, Pitch 60°

## License

CC0 1.0 Universal