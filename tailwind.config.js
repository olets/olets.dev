const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/data/data.yaml', './src/views/**/*.twig'],
  theme: {
    extend: {
      aspectRatio: {
        card: '1280 / 640',
      },
      fontFamily: {
        serif: [
          'Hey August',
          'Blocked Off',
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
