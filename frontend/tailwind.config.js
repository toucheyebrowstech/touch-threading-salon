/**
 * File: frontend/tailwind.config.js
 * Purpose: Configures Tailwind CSS content scanning and combined salon public/admin brand theme colors.
 * Features: Warm blush, cream, brown, gold, rose, shadow, and font tokens used by the public website and admin dashboard.
 * Used by: Tailwind build process and all React components.
 * Future edits: Change brand colors, shadows, radius, or fonts here.
 */

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f8d8d4',
        rosegold: '#c98b73',
        cream: '#fff8f0',
        latte: '#ead7c2',
        cocoa: '#4b2f28',
        espresso: '#2f1d18',
        gold: '#c9a24a',
        brown: '#3B241A',
        rose: '#B96C7B'
      },
      boxShadow: {
        salon: '0 20px 60px rgba(75, 47, 40, 0.12)',
        soft: '0 18px 45px rgba(59,36,26,.10)'
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
