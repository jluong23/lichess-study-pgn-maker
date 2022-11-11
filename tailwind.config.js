/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'orbitron' : ['Orbitron', "sans-serif"]
      },
      colors: {
        primary: colors.blue[400],
        background: colors.neutral[300]
      },
      screens: {
        'xs': '460px'
      },
      transitionProperty: {
        'width' : 'width'
      }
    },
  },
  plugins: [],
}
