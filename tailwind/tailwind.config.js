/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../frontend/src/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
