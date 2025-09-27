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
    
    // Add hillshading layer (add before terrain22 so terrain22 can be partially transparent)
    map.addLayer({
      id: 'hillshading',
      type: 'hillshade',
      source: 'matterhorn',
      layout: {},
      paint: {
        // Use semi-transparent colors so hillshade shows through terrain22 fill
        'hillshade-accent-color': 'rgba(90,90,90,0.6)',
        'hillshade-shadow-color': 'rgba(0,0,0,0.6)',
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
    
    // terrain22 の公式スタイルに準拠したレイヤー定義
    // hillshade が下にある前提で、fill-opacity を下げて陰影を透過表示する
    map.addLayer({
      id: 'terrain22',
      type: 'fill',
      source: 'terrain22',
      'source-layer': 'terrain22',
      paint: {
        'fill-color': [
          'match',
          ['get', 'terrain22'],
          1, 'rgb(112, 79, 41)',
          2, 'rgb(172, 82, 50)',
          3, 'rgb(153, 131, 83)',
          4, 'rgb(251, 154, 153)',
          5, 'rgb(248, 3, 204)',
          6, 'rgb(243, 162, 243)',
          7, 'rgb(145, 150, 185)',
          8, 'rgb(40, 135, 108)',
          9, 'rgb(20, 172, 132)',
          10, 'rgb(31, 195, 105)',
          11, 'rgb(223, 134, 31)',
          12, 'rgb(30, 218, 74)',
          13, 'rgb(125, 162, 143)',
          14, 'rgb(155, 151, 169)',
          15, 'rgb(251, 147, 0)',
          16, 'rgb(122, 236, 50)',
          17, 'rgb(249, 180, 4)',
          18, 'rgb(194, 251, 71)',
          19, 'rgb(251, 216, 15)',
          20, 'rgb(154, 255, 255)',
          21, 'rgb(253, 253, 120)',
          22, 'rgb(0, 183, 255)',
          'rgb(100, 100, 100)'
        ],
        // デフォルト推奨: 部分透過にして下層の hillshade を透かす
        'fill-opacity': 0.75
      },
      maxzoom: 22
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
