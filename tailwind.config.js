const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/views/**/*.html.twig'],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          'Hey August',
          'Blocked Off',
          ...defaultTheme.fontFamily.serif,
        ],
      },
      link: colors.blue,
    },
  },
}
