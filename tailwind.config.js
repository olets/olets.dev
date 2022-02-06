const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['**/*.njk'],
  theme: {
    extend: {
      aspectRatio: {
        card: '1280 / 640',
      },
      fontFamily: {
        serif: [
          'Hey August',
          ...defaultTheme.fontFamily.serif,
        ],
      },
      colors: {
        black: "#474747",
        link: {
          ...colors.blue,
          DEFAULT: colors.blue['500'],
        },
      },
      ringColor: ({ theme }) => ({
        DEFAULT: theme('colors.link.DEFAULT'),
      }),
      textDecorationColor: ({ theme }) => ({
        ...theme('colors'),
      }),
    },
  },
}
