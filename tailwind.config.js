const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/views/**/*.html.twig'],
  theme: {
    extend: {
      backgroundImage: {
        ocean: "url(/ocean.jpg)",
        sky: "url(/sky.jpg)",
      },
      link: colors.blue,
    },
  },
}
