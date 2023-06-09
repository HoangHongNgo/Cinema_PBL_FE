/ @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {screens: {
      'md': {'max': '1024px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }


      'xl': {'min': '1024px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
    },},
  },
  plugins: [],
}

