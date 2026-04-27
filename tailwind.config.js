/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'manga': ['JingnanMaiyuan', '"ZCOOL KuaiLe"', 'cursive'],
        'serif-classic': ['GudianKebonSongti', 'serif'],
        'sans': ['Inter', 'Noto Sans SC', 'sans-serif'],
      },
      colors: {
        'page-bg': '#FAF6ED',
        'primary': '#D4A843',
        'secondary': '#8C6B3F',
        'accent': '#7BA7D9',
        'text-main': '#2C2416',
        'text-sub': '#8A7E6B',
        'card-bg': '#FFFFFF',
        'quote-bg': '#FFF8E7',
      },
      borderRadius: {
        'card': '12px',
        'btn': '9999px',
        'img': '8px',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(140, 107, 63, 0.15)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
}
