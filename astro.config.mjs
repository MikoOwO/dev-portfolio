// @ts-check
import { defineConfig } from 'astro/config';

// Site statique : Vercel détecte Astro et sert le dossier dist/.
export default defineConfig({
  output: 'static',
  vite: {
    build: {
      // garde les préfixes utiles à Safari 15-17 (ex. -webkit-backdrop-filter de l'en-tête)
      cssTarget: ['chrome111', 'edge111', 'firefox113', 'safari15'],
      // three.js forme à lui seul un bloc d'environ 550 ko, partagé par les trois scènes
      chunkSizeWarningLimit: 600,
    },
  },
});
