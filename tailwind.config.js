/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        robot: {
          deep: '#2F275A',
          bright: '#51489A',
          cyan: '#5FB7C2',
          gold: '#B98A4A',
          navy: '#080B14',
          fog: '#F6F7FB',
        },
      },
      fontFamily: {
        display: ['"IBM Plex Sans"', '"Segoe UI"', 'sans-serif'],
        body: ['"Manrope"', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 18px 60px rgba(8, 11, 20, 0.24)',
      },
    },
  },
  plugins: [],
};
