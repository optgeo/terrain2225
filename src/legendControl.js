import { terrainLegendData, legendTitle, languageLabels } from './terrainLegend.js';

export class LegendControl {
  constructor() {
    this.currentLanguage = 'en'; // Default to English
    this.isCollapsed = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.populateLegend();
    this.updateLanguage();
  }

  bindEvents() {
    // Language toggle
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
      languageToggle.addEventListener('click', () => {
        this.toggleLanguage();
      });
    }

    // Collapse toggle
    const collapseToggle = document.getElementById('collapse-toggle');
    if (collapseToggle) {
      collapseToggle.addEventListener('click', () => {
        this.toggleCollapse();
      });
    }

    // Header click for collapse (alternative way to collapse)
    const legendHeader = document.getElementById('legend-header');
    if (legendHeader) {
      legendHeader.addEventListener('click', (e) => {
        // Only toggle if clicking on the header itself, not the buttons
        if (e.target === legendHeader || e.target === document.getElementById('legend-title')) {
          this.toggleCollapse();
        }
      });
    }
  }

  populateLegend() {
    const legendItems = document.getElementById('legend-items');
    if (!legendItems) return;

    // Clear existing items
    legendItems.innerHTML = '';

    // Create legend items for each terrain type
    Object.keys(terrainLegendData).forEach(key => {
      const terrain = terrainLegendData[key];
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.dataset.terrainType = key;

      const colorBox = document.createElement('div');
      colorBox.className = 'legend-color';
      colorBox.style.backgroundColor = terrain.color;

      const textElement = document.createElement('div');
      textElement.className = 'legend-text';
      textElement.dataset.en = terrain.en;
      textElement.dataset.ja = terrain.ja;

      item.appendChild(colorBox);
      item.appendChild(textElement);
      legendItems.appendChild(item);
    });
  }

  updateLanguage() {
    // Update title
    const titleElement = document.getElementById('legend-title');
    if (titleElement) {
      titleElement.textContent = legendTitle[this.currentLanguage];
    }

    // Update language toggle button
    const toggleButton = document.getElementById('language-toggle');
    if (toggleButton) {
      const otherLanguage = this.currentLanguage === 'en' ? 'ja' : 'en';
      toggleButton.textContent = languageLabels[otherLanguage];
    }

    // Update all legend item texts
    const textElements = document.querySelectorAll('.legend-text');
    textElements.forEach(element => {
      element.textContent = element.dataset[this.currentLanguage];
    });
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ja' : 'en';
    this.updateLanguage();
  }

  toggleCollapse() {
    const panel = document.getElementById('legend-panel');
    const collapseToggle = document.getElementById('collapse-toggle');
    
    if (!panel || !collapseToggle) return;

    this.isCollapsed = !this.isCollapsed;
    
    if (this.isCollapsed) {
      panel.classList.add('collapsed');
      collapseToggle.textContent = '+';
      collapseToggle.title = 'Expand legend';
    } else {
      panel.classList.remove('collapsed');
      collapseToggle.textContent = '−';
      collapseToggle.title = 'Collapse legend';
    }
  }

  // Method to show/hide the entire legend panel
  setVisible(visible) {
    const panel = document.getElementById('legend-panel');
    if (panel) {
      panel.style.display = visible ? 'block' : 'none';
    }
  }
}