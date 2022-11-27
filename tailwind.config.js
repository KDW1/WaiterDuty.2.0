/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*/*.ejs','./*/*.css','./*/*.js'
  ],
  theme: {
    screens: {
      'bruh': '430px',

      'sm': '550px',
      // => @media (min-width: 640px) { ... }

      'md': '675px',
      // => @media (min-width: 768px) { ... }

      'lg': '1050px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    display: ['group-hover'] // Group-hover for divs
  },
  plugins: [
    // Get typography and line-clamp plugins
  ],
}
