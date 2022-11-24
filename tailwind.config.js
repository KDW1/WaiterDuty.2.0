/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*/*.ejs','./*/*.css','./*/*.js'
  ],
  theme: {
    extend: {},
    display: ['group-hover'] // Group-hover for divs
  },
  plugins: [
    // Get typography and line-clamp plugins
  ],
}
