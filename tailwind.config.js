/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#8B4789',
        'secondary-purple': '#B983B8',
        'cta-orange': '#FF6B35',
        'whatsapp-green': '#25D366',
        'dark-bg': '#0F172A',
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
