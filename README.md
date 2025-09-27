# terrain2225

**A modern 3D terrain visualization web application using MapLibre GL JS**

## Overview

terrain2225 is the 2025 implementation of the terrain22 project, featuring advanced 3D terrain visualization based on the prestigious **Terrain2021** dataset from the Geospatial Information Authority of Japan (GSI). This application provides an interactive web-based platform for exploring Japan's terrain classification data with stunning visual fidelity and modern web technologies.

Built upon the groundbreaking research by Iwahashi and Yamazaki (2022), this implementation transforms scientific terrain classification data into an accessible and visually compelling web mapping experience. The application leverages MapLibre GL JS for high-performance rendering and is deployed via GitHub Pages for seamless accessibility.

### Key Improvements Over Previous Versions

This 2025 implementation includes several significant enhancements over the original terrain22:

## Features

- **🗾 3D Terrain Visualization**: Immersive 3D terrain rendering using official Terrain2021 data from GSI Japan
- **🚀 MapLibre GL JS**: Modern, performant, open-source web mapping library with WebGL acceleration
- **⚡ Vite Build System**: Lightning-fast development experience and optimized production builds
- **🎨 Rich Terrain Classification**: 22 distinct terrain types with scientifically-based color coding
- **🌐 Globe Control**: Interactive globe projection control for global context (when available)
- **📱 Responsive Design**: Optimized for desktop and mobile viewing experiences
- **🔗 Clean URLs**: Hash-free URLs for better SEO and sharing
- **☁️ GitHub Pages Deployment**: Automatic CI/CD deployment with zero server maintenance
- **🎯 No Transparency Polygons**: Terrain polygons rendered with full opacity for maximum visual impact

### Planned Features (Future Releases)

- **📊 Terrain Statistics**: Interactive charts and analysis tools
- **🔍 Advanced Search**: Location-based terrain type filtering
- **📥 Data Export**: Export terrain data for research and analysis
- **🎮 Interactive Tours**: Guided exploration of notable terrain features
- **📊 Elevation Profiles**: Cross-sectional terrain analysis tools

## Data Sources & Background

### Terrain2021 - The Foundation Dataset

This application is built upon the **Terrain2021** dataset, a revolutionary global terrain classification system developed by the Geospatial Information Authority of Japan (GSI). Terrain2021 represents a significant advancement in terrain analysis, providing scientifically-rigorous classification of the Earth's surface into 22 distinct terrain types.

**Key Dataset Information:**
- **Coverage**: Global terrain classification with high-resolution focus on Japan
- **Classes**: 22 distinct terrain types based on slope and hydrological characteristics
- **Resolution**: Optimized for zoom levels 9-13 (detailed regional to local scale)
- **Methodology**: Based on uniform slope and basin analysis methodology

### Technical Data Sources

The application consumes terrain data through optimized tile services:

- **`https://tunnel.optgeo.org/martin/terrain22`** - Vector terrain polygon data
  - Terrain classification polygons with 22-class system
  - Optimized for web mapping performance
  - Source layer: `terrain22`

- **`https://tunnel.optgeo.org/martin/mapterhorn`** - Elevation and hillshading data
  - High-resolution digital elevation model (DEM)
  - Real-time hillshading computation
  - Terrarium encoding for efficient data transfer

### Related Projects & Resources

- **🏛️ [Official GSI Terrain2021 Site](https://gisstar.gsi.go.jp/terrain2021/)** - Primary data source and research documentation
- **📦 [optgeo/terrain22 Repository](https://github.com/optgeo/terrain22)** - Original PMTiles implementation and data processing tools
- **🌐 [Live terrain22 Demo](https://optgeo.github.io/terrain22)** - Previous generation implementation
- **📊 [Observable Notebook](https://observablehq.com/d/e66dd18a3be303c7)** - Interactive data exploration and analysis

## Quick Start

### Live Application

🌐 **Access the live application**: [https://optgeo.github.io/terrain2225/](https://optgeo.github.io/terrain2225/)

The application loads with a default view of Tokyo, Japan, showcasing the diverse terrain types of the Kanto region. Use the navigation controls to explore different areas and zoom levels to see terrain classification at various scales.

### Navigation Guide

- **🖱️ Pan**: Click and drag to move around the map
- **🔍 Zoom**: Use mouse wheel or +/- controls to zoom in/out
- **🌏 3D View**: Drag with right mouse button to adjust pitch and bearing
- **🌐 Globe**: Toggle globe projection using the globe control (top-right)
- **📍 Location**: Click anywhere on the map to see coordinates in the console (developer mode)

### Understanding Terrain Types

The application visualizes 22 distinct terrain classification types, each represented by a unique color. These classifications are based on scientific analysis of slope characteristics and hydrological basins:

**Key Terrain Categories:**
- **Mountain Terrain**: High-elevation areas with steep slopes and varied topography
- **Hill Terrain**: Moderate elevation areas with rolling topography
- **Basin Areas**: Low-lying areas including valleys and depressions
- **Coastal Plains**: Flat areas near coastlines with minimal elevation change
- **River Systems**: Areas shaped by fluvial processes and water flow
- **Plateau Regions**: Elevated flat areas with distinct boundaries

Each terrain type reflects unique geomorphological processes and provides insights into the landscape formation history of Japan's diverse geography.

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

### Architecture & Technologies

- **🖥️ Frontend Framework**: Vanilla JavaScript with ES6+ modules
- **🗺️ Mapping Library**: [MapLibre GL JS v4.7.1](https://maplibre.org/) - Open-source WebGL-powered mapping
- **🔧 Build Tool**: [Vite v5.4.0](https://vitejs.dev/) - Next-generation frontend tooling
- **☁️ Deployment**: GitHub Pages with automated CI/CD via GitHub Actions
- **📦 Module System**: ES6 modules with tree-shaking optimization
- **🎨 Styling**: CSS3 with responsive design principles

### Map Configuration

- **🌍 Base Path**: `/terrain2225/` (configured for GitHub Pages)
- **🎮 Map Controls**: Navigation controls, Attribution, Globe projection (when available)
- **📍 Initial Location**: Tokyo, Japan (139.7°E, 35.68°N)
- **👁️ Initial View**: Zoom level 10, Pitch 60° for optimal 3D terrain visualization
- **🎯 Zoom Range**: Levels 9-13 (optimized for terrain data resolution)

### Performance Optimizations

- **⚡ Vector Tiles**: Efficient terrain polygon data delivery
- **🗻 Terrarium Encoding**: Optimized elevation data encoding (16-bit precision)
- **🔄 Retry Logic**: Robust TileJSON loading with automatic retry mechanisms
- **📱 Responsive**: Optimized for both desktop and mobile devices
- **🚀 CDN Delivery**: Fast global content delivery via GitHub Pages CDN

### Data Processing Pipeline

The terrain data follows this processing pipeline:
1. **Source Data**: Terrain2021 global polygon dataset from GSI Japan
2. **Tile Generation**: Converted to vector tiles via Martin tile server
3. **Classification**: 22-class terrain type system with scientific color mapping
4. **Elevation Integration**: Combined with mapterhorn DEM for 3D visualization
5. **Web Optimization**: Optimized for web delivery with appropriate zoom level ranges

## Acknowledgements & Data Attribution

### Primary Data Source

This project is built upon the exceptional **Terrain2021** dataset provided by the **Geospatial Information Authority of Japan (GSI)**. We extend our deepest gratitude to GSI for making this valuable scientific dataset publicly available and accessible to the global research and development community.

**Official Source**: [GSI Terrain2021 Portal](https://gisstar.gsi.go.jp/terrain2021/)

### Scientific Foundation

The terrain classification system implemented in this application is based on the pioneering research methodology developed by:

**Iwahashi, J., Yamazaki, D. (2022)** *Global polygons for terrain classification divided into uniform slopes and basins.* Progress in Earth and Planetary Science 9, 33. https://doi.org/10.1186/s40645-022-00487-2

This research represents a significant advancement in automated terrain classification and provides the scientific foundation for the 22-class terrain type system visualized in this application.

### Research Support

The original research was supported by **JSPS KAKENHI Grant Number JP18H00769**. Following the open access principles encouraged by JSPS KAKENHI, this valuable dataset has been made available to benefit the broader scientific and development communities.

### Technical Contributors

- **Original terrain22 Implementation**: [optgeo/terrain22](https://github.com/optgeo/terrain22) project team
- **PMTiles Technology**: Protomaps community and contributors
- **MapLibre GL JS**: MapLibre Organization and open-source contributors
- **Data Processing**: Martin tile server and associated toolchain

### Community Impact

This project demonstrates the power of open science and data sharing. By making Terrain2021 data accessible through modern web technologies, we hope to:

- Enable new research applications in geomorphology and terrain analysis
- Support educational initiatives in earth sciences and geography
- Facilitate development of location-aware applications and services
- Promote understanding of Japan's diverse and complex terrain characteristics

We are deeply grateful to all contributors who have made this visualization possible, from the original researchers to the open-source software maintainers who provide the technological foundation for this work.

## Citation Guidelines

### For the Original Polygon Data

When using terrain classification data from this application, please cite the foundational research:

```
Iwahashi, J., Yamazaki, D. (2022) Global polygons for terrain classification 
divided into uniform slopes and basins. Prog Earth Planet Sci 9, 33. 
https://doi.org/10.1186/s40645-022-00487-2
```

### For Terrain2021/Terrain22 Data

When specifically referencing the Terrain2021/Terrain22 dataset, please include:

```
We used Terrain22, which is publicly available from https://gisstar.gsi.go.jp/terrain2021/ 
as a derivative of the data by Iwahashi and Yamazaki (2022).
```

### For This Implementation

When referencing this specific web application or implementation:

```
terrain2225: A web-based 3D terrain visualization application based on Terrain2021 data. 
Available at: https://optgeo.github.io/terrain2225/
```

## License

## License

### Application Code

This terrain2225 web application is released under **CC0 1.0 Universal** - dedicated to the public domain.

You are free to:
- ✅ Use the code for any purpose, including commercial applications
- ✅ Modify and distribute the code without restrictions
- ✅ Create derivative works and adaptations
- ✅ Use without attribution (though attribution is appreciated)

### Data License

The underlying **Terrain2021 data** is made available by GSI Japan under **Creative Commons CC-BY 4.0** license, consistent with JSPS KAKENHI open access principles.

**Requirements for data usage**:
- ✅ **Attribution Required**: Must cite the original research (Iwahashi & Yamazaki, 2022)
- ✅ **Source Acknowledgment**: Must reference GSI Terrain2021 portal
- ✅ **Academic Integrity**: Follow proper scientific citation practices

### Third-Party Components

- **MapLibre GL JS**: BSD-3-Clause License
- **Vite**: MIT License
- **Node.js Dependencies**: Various open-source licenses (see package.json)

---

**For questions, contributions, or collaboration opportunities, please visit the [GitHub repository](https://github.com/optgeo/terrain2225) or explore the broader [optgeo project ecosystem](https://github.com/optgeo).**