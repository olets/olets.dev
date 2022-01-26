const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./dist/**/*.html"],
  theme: {
    extend: {
      link: colors.blue,
    },
  },
}
