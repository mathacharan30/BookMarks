/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2563EB',
          light: '#DBEAFE',
          sky: '#60A5FA',
          dark: '#1E3A8A',
        }
      }
    },
  },
  plugins: [],
}
