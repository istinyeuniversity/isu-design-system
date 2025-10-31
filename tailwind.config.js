/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007fff',
          dark: '#003eff'
        },
        neutral: {
          DEFAULT: '#ededed',
          dark: '#1a1a1a'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Poppins', 'sans-serif']
      }
    },
  },
  darkMode: ['class', '[data-theme="dark"]']
};
