/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./projects/**/*.{html,md}",
      "./blog/**/*.{html,md}"
    ],
    theme: {
      extend: {
        borderRadius: {
          xlr: "1.25rem",
          "2xlr": "1.5rem"
        },
        boxShadow: {
          soft: "0 10px 30px -12px rgba(0,0,0,.25)"
        },
        colors: {
          ink: "#0b1021",
          cream: "#fbfaf7",
          candy: { 50: "#fdf2ff", 200: "#ecc4ff", 400: "#c67cff", 600: "#8a3ffc" },
          mint:  { 50: "#ecfdf5", 200: "#a7f3d0", 400: "#34d399", 600: "#059669" },
          sun:   { 50: "#fffbea", 200: "#fde68a", 400: "#f59e0b", 600: "#d97706" }
        }
      }
    },
    plugins: [],
    safelist: [
        // examples:
        'bg-candy-400','bg-candy-600',
        'bg-mint-200','bg-sun-200',
        'rounded-2xlr','shadow-soft'
      ]
  };
  
  