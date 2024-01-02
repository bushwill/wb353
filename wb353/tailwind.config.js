/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      minWidth: {
        'popup': '80%'
      },
      minHeight: {
        'popup': '80%'
      }
    },
  },
  plugins: [],
}

