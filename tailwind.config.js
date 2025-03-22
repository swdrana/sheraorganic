/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/defaultTheme')

const colors = {
  ...defaultColors,
  ...{
      'primary': {
        1: '#F5F5F5',
        2: '#F5F6FA',
      },
      'gray': {
        1: '#637381',
        2: '#626262',
        3: '#CFCFCE',
        4: '#D9D9D9',
        5: '#262724',
      },
      'brand': '#ff7c08',
      'dark': '#0E0E11',
    },
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      "colors": colors,
    },
  },
  plugins: [],
};
