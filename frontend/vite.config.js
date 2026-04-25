/**
 * File: frontend/vite.config.js
 * Purpose: Configures Vite for the Touch Threading and Brows Salon React frontend.
 * Features: React plugin setup and dev server configuration.
 * Used by: npm run dev, npm run build, and Vercel builds.
 * Future edits: Add aliases, proxy rules, or build customizations here.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
});
