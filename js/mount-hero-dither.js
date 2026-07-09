/**
 * mount-hero-dither.js — Mounts the React Bits Dither component
 * into the hero section background.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import Dither from './react-bits/Dither.js';

const rootEl = document.getElementById('hero-dither-root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    React.createElement(Dither, {
      waveColor: [0.5, 0.5, 0.5],
      disableAnimation: false,
      enableMouseInteraction: true,
      mouseRadius: 0.3,
      colorNum: 4,
      pixelSize: 2,
      waveAmplitude: 0.3,
      waveFrequency: 3,
      waveSpeed: 0.05
    })
  );
}
