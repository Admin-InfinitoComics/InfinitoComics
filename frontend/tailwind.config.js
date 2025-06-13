export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'custom-dark': '#171717',
        'custom-darker': '#202020',
        'custom-gray': '#595959',
      },
    },
  },
  plugins: [],
}
