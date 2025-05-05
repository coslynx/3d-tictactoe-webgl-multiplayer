/** @type {import('tailwindcss').Config} */
 module.exports = {
  // Enable dark mode based on media preference
  darkMode: 'media',
  // Define the content paths to purge unused CSS classes
  content: [
  './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Configure responsive breakpoints
  theme: {
  extend: {
  // Define custom colors
  colors: {
  primary: '#282c34', // Dark background color
  secondary: '#61dafb', // Light blue highlight color
  accent: '#98c379',  // Lime green accent color
  },
  // Configure typography
  fontFamily: {
  heading: ['Roboto Condensed', 'sans-serif'], // Font for headings
  body: ['Open Sans', 'sans-serif'],  // Font for body text
  },
  // Configure responsive breakpoints
  screens: {
  sm: '640px',  // Small screens
  md: '768px',  // Medium screens
  lg: '1024px', // Large screens
  xl: '1280px', // Extra large screens
  '2xl': '1536px', // 2X extra large screens
  },
  },
  },
  // Define plugins (if any)
  plugins: [],
 }