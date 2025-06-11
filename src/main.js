// src/main.js
import './style.css';

// Add loading indicator
document.querySelector('#app').appendChild(
  Object.assign(document.createElement('div'), {
    id: 'loading',
    className: 'lds-dual-ring center-screen',
  })
);

console.log('main.js loaded, waiting for Godot engine');

function setupEventListeners() {
  console.log('Setting up button event listeners');
  const earthButton = document.getElementById('load-earth');
  const marsButton = document.getElementById('load-mars');
  const venusButton = document.getElementById('load-venus');
  
  if (!earthButton || !marsButton || !venusButton) {
    console.error('Button elements not found:', { earthButton, marsButton, venusButton });
    return;
  }

  earthButton.addEventListener('click', () => {
    console.log('Clicked Load Earth');
    if (window.loadPlanet) {
      window.loadPlanet("res://earth.tres");
    } else {
      console.error('loadPlanet not available when clicking Load Earth');
    }
  });

  marsButton.addEventListener('click', () => {
    console.log('Clicked Load Mars');
    if (window.loadPlanet) {
      window.loadPlanet("res://mars.tres");
    } else {
      console.error('loadPlanet not available when clicking Load Mars');
    }
  });
  venusButton.addEventListener('click', () => {
    console.log('Clicked Load Venus');
    if (window.loadPlanet) {
      window.loadPlanet("res://venus.tres");
    } else {
      console.error('loadPlanet not available when clicking Load Venus');
    }
  });
}

window.engine.startGame().then(() => {
  console.log('Godot engine started');
  document.getElementById('loading')?.remove();

  // Check if loadPlanet is already defined
  if (window.loadPlanet && typeof window.loadPlanet === 'function') {
    console.log('loadPlanet found immediately');
    setupEventListeners();
    return;
  }

  // Listen for godotJsReady event 
  window.addEventListener('godotJsReady', () => {
    console.log('godotJsReady event received');
    if (window.loadPlanet && typeof window.loadPlanet === 'function') {
      console.log('loadPlanet function found via godotJsReady');
      setupEventListeners();
    } else {
      console.error('loadPlanet not found after godotJsReady, typeof:', typeof window.loadPlanet);
    }
  }, { once: true });

  // Fallback polling
  let retries = 50;
  const interval = 200;
  const pollForLoadPlanet = () => {
    console.log('Polling for loadPlanet, retries left:', retries);
    if (window.loadPlanet && typeof window.loadPlanet === 'function') {
      console.log('loadPlanet found via polling');
      setupEventListeners();
    } else if (retries > 0) {
      retries--;
      setTimeout(pollForLoadPlanet, interval);
    } else {
      console.error('Failed to find loadPlanet after polling, typeof:', typeof window.loadPlanet);
    }
  };
  setTimeout(pollForLoadPlanet, 500); // Start polling after 0.5s
}).catch(err => {
  console.error('Godot engine failed to start:', err);
});