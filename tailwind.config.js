/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Crimson Text', 'Georgia', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'cream': {
          50: '#fefdf8',
          100: '#fdf9f0',
          200: '#faf2e1',
          300: '#f6e8c8',
          400: '#f0d9a3',
          500: '#e8c474',
          600: '#dda94a',
          700: '#c8912d',
          800: '#a67c24',
          900: '#8a6720',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // 👈 Add this line here
  ],
};