/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f1f8fe',
        midnight: {
          light: '#11438a',
          dark: '#062750',
        },
      },
    },
  },
  plugins: [],
}
