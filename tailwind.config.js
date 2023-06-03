/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F7F7F8',
          100: '#ECECF1',
          300: '#C5C5D2',
          400: '#ACACBE',
          500: '#8E8EA0',
          700: '#40414F',
          800: '#343541',
          900: '#202123',
        },
        'green' : '#00A67E'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
