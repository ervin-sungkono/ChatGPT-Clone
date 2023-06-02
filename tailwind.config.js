import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
    },
    extend: {
      colors: {
        gray: {
          50: '#F7F7F8',
          100: '#ECECF1',
          500: '#8E8EA0',
          800: '#343541',
          900: '#202123',
        },
        'green' : '#00A67E'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
