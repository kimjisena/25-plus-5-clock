/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    colors: {
      'white': '#F9FAFE',
      'black': '#444549',
      'red': '#F73349',
      'green': '#01D86D',
      'orange': '#C56F17',
      'gray': '#696969'
    },
    fontFamily: {
      'font-one': ['Montserrat', 'sans-serif'],
      'font-two': ['Quicksand', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
