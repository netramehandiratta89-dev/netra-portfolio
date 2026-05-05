/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08090f',
        pearl: '#f7f8fb',
        aurora: '#7c3aed',
        plasma: '#19d3da',
        champagne: '#f7d794',
        graphite: '#151720'
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 0 42px rgba(25, 211, 218, 0.22)',
        luxury: '0 28px 80px rgba(0, 0, 0, 0.34)'
      }
    }
  },
  plugins: []
};
