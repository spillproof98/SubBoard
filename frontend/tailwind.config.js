/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6A38E3",
          dark: "#4C26A3",
          light: "#9B6BFF"
        }
      }
    },
  },
  plugins: [],
}
