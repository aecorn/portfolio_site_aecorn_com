/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          light: '#f5f5f5',
          dark: '#111827',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-mont)', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(148, 163, 184, 0.3), 0 18px 35px -15px rgba(15, 23, 42, 0.45)',
      },
      backgroundImage: {
        'grid-radial':
          'radial-gradient(circle, rgba(148, 163, 184, 0.12) 2px, transparent 2px)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
