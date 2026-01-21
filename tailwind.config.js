/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false, // use Bootstrap's container for row/col grid
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5016',
          light: '#4A7C2A',
          dark: '#1A3009',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          light: '#E5C866',
          dark: '#B8941F',
        },
        accent: {
          DEFAULT: '#1E3A8A',
          light: '#3B5FA8',
          dark: '#15285C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
