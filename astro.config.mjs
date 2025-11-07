import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.ladoblebragado.com.ar', // ✅ Tu dominio real con www
  integrations: [tailwind(), react()],
  
  // Configuraciones para Hostinger y SEO
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    format: 'directory' // URLs limpias sin .html
  },
  
  // Optimización para hosting estático
  output: 'static',
  adapter: undefined // Static hosting, no adapter needed
});