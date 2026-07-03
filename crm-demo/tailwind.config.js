/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0078D4',
          light: '#4DA6FF',
          50: '#E6F2FF',
          100: '#CCE4FF',
          200: '#99C9FF',
          300: '#66ADFF',
          400: '#3392FF',
          500: '#0078D4',
          600: '#005FA6',
          700: '#004578',
          800: '#002C4A',
          900: '#00131C',
        },
        accent: {
          DEFAULT: '#107C10',
          light: '#5DC75D',
          50: '#E8F5E8',
          100: '#C8E6C8',
          200: '#A5D6A5',
          300: '#81C784',
          400: '#5DC75D',
          500: '#107C10',
          600: '#0C5E0C',
          700: '#084008',
          800: '#042204',
          900: '#021102',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#2D2D2D',
        },
        background: {
          DEFAULT: '#F5F5F5',
          dark: '#1F1F1F',
        },
        border: {
          light: '#EDEBE9',
          dark: '#404040',
        },
      },
      borderRadius: {
        card: '8px',
        button: '6px',
      },
      spacing: {
        '4.5': '18px',
        '18': '72px',
      },
    },
  },
  plugins: [],
}
