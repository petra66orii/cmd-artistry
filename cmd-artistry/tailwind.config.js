/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FBDADE',
        'pastel-beige': '#F5D29D',
        'off-white': '#FEFEFE',
        'pastel-lime': '#DAFF99',
        'dark-charcoal': '#071B20',
      }
    },
  },
  plugins: [],
}

