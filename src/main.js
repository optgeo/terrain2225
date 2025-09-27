import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Initialize the map
const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {},
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#f8f8f8'
        }
      }
    ]
  },
  center: [139.7, 35.68], // Tokyo coordinates as default
  zoom: 10,
  pitch: 60,
  bearing: 0
});

// Add standard navigation controls
map.addControl(new maplibregl.NavigationControl(), 'top-right');

// Add GlobeControl if available (newer versions of MapLibre GL JS)
try {
  if (maplibregl.GlobeControl) {
    map.addControl(new maplibregl.GlobeControl(), 'top-right');
  } else {
    console.log('GlobeControl not available in this version of MapLibre GL JS');
  }
} catch (error) {
  console.log('GlobeControl not available:', error.message);
}

// Helper function to load TileJSON with retries
async function loadTileJSON(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed for ${url}:`, error.message);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Add terrain and hillshading sources and layers when map is loaded
map.on('load', async () => {
  let terrain22Data = null;
  let matternData = null;
  
  try {
    // Try to fetch TileJSON for terrain22 (terrain data)
    console.log('Loading terrain22 TileJSON...');
    terrain22Data = await loadTileJSON('https://tunnel.optgeo.org/martin/terrain22');
    console.log('terrain22 TileJSON loaded successfully');
  } catch (error) {
    console.warn('Failed to load terrain22 TileJSON:', error.message);
  }
  
  try {
    // Try to fetch TileJSON for mapterhorn (hillshading/elevation)  
    console.log('Loading mapterhorn TileJSON...');
    matternData = await loadTileJSON('https://tunnel.optgeo.org/martin/mapterhorn');
    console.log('mapterhorn TileJSON loaded successfully');
  } catch (error) {
    console.warn('Failed to load mapterhorn TileJSON:', error.message);
  }
  
  // Add matterhorn source for terrain elevation if available
  if (matternData && matternData.tiles) {
    map.addSource('matterhorn', {
      type: 'raster-dem',
      tiles: matternData.tiles,
      minzoom: matternData.minzoom || 0,
      maxzoom: matternData.maxzoom || 22,
      tileSize: 256,
      encoding: 'terrarium'
    });
    
    // Set terrain for 3D visualization
    map.setTerrain({
      source: 'matterhorn',
      exaggeration: 1
    });
    
    // Add hillshading layer
    map.addLayer({
      id: 'hillshading',
      type: 'hillshade',
      source: 'matterhorn',
      layout: {},
      paint: {
        'hillshade-accent-color': '#5a5a5a',
        'hillshade-shadow-color': '#000000',
        'hillshade-illumination-direction': 315,
        'hillshade-exaggeration': 0.5
      }
    });
    
    console.log('Matterhorn terrain and hillshading layers added');
  }
  
  // Add terrain22 source and layers if available
  if (terrain22Data && terrain22Data.tiles) {
    map.addSource('terrain22', {
      type: 'vector',
      tiles: terrain22Data.tiles,
      minzoom: terrain22Data.minzoom || 0,
      maxzoom: terrain22Data.maxzoom || 22
    });
    
    // Add terrain polygon layers with no transparency (always most dense)
    // This will depend on the actual layer structure in terrain22 TileJSON
    map.addLayer({
      id: 'terrain-polygons',
      type: 'fill',
      source: 'terrain22',
      'source-layer': 'terrain', // This may need to be adjusted based on actual data structure
      layout: {},
      paint: {
        'fill-color': [
          'case',
          ['has', 'elevation'],
          [
            'interpolate',
            ['linear'],
            ['get', 'elevation'],
            0, '#2E8B57',
            500, '#228B22',
            1000, '#8FBC8F',
            1500, '#DEB887',
            2000, '#D2691E',
            3000, '#A0522D'
          ],
          '#696969'
        ],
        'fill-opacity': 1.0 // Always fully opaque - no transparency
      }
    });
    
    console.log('terrain22 polygon layers added');
  }
  
  // If neither primary source is available, add fallback terrain
  if (!matternData && !terrain22Data) {
    console.log('Primary data sources unavailable, adding styled background...');
    
    // Add a terrain-style background instead of external sources
    map.addLayer({
      id: 'terrain-style-background',
      type: 'background',
      paint: {
        'background-color': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, '#87CEEB',  // Sky blue at low zoom
          5, '#90EE90',  // Light green at medium zoom  
          10, '#228B22', // Forest green 
          15, '#8B4513'  // Saddle brown at high zoom
        ]
      }
    });
    
    console.log('Styled background added - ready for terrain data when available');
  }
  
  console.log('Map initialization complete');
});

// Add click handler for debugging
map.on('click', (e) => {
  console.log('Map clicked at:', e.lngLat);
});

console.log('terrain2225 initialized');