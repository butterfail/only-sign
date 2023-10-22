/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./assets/**/*.js', './templates/**/*.html.twig'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {},
  },
  plugins: [],
};
