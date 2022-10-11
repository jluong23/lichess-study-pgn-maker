/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[400],
        background: colors.neutral[300]
      }
    },
  },
  plugins: [],
}
