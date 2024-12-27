/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        haverbrooke: ['haverbrooke', 'sans-serif'],
        'rubik-vinyl': ['"Rubik Vinyl"', 'sans-serif'],
        // Register the custom font
      },
      keyframes: {
        lightning: {
          '0%, 100%': {
            textShadow: '0 0 5px #4f46e5, 0 0 10px #4f46e5, 0 0 20px #4f46e5, 0 0 40px #4f46e5',
          },
          '50%': {
            textShadow: '0 0 10px #6366f1, 0 0 20px #6366f1, 0 0 40px #6366f1, 0 0 60px #6366f1',
          },
        },
      },
      animation: {
        lightning: 'lightning 2s infinite', // Add the lightning animation
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
};
