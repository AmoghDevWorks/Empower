/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        haverbrooke: ['haverbrooke', 'sans-serif'], // Register the custom font
      },
    },
  },
  plugins: [],
}

