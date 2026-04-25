/**
 * File: frontend/postcss.config.js
 * Purpose: Connects Tailwind CSS and Autoprefixer to the Vite frontend build.
 * Features: PostCSS plugin configuration.
 * Used by: npm run dev and npm run build.
 * Future edits: Add PostCSS plugins here if the styling pipeline grows.
 */

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
