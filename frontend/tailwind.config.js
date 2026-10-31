/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#6D0F2B',
          main: '#8B1E3F',
          light: '#A63D5A',
        },
        secondary: {
          light: '#F5F5F5',
          main: '#E8E8E8',
        },
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
