const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/views/**/*.html.twig'],
  theme: {
    extend: {
      link: colors.blue,
    },
  },
}
