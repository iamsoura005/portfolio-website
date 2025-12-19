/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-black': '#050505',
        'terminal-dark': '#0a0a0a',
        'terminal-green': '#00ff41', // Standard matrix/terminal green
        'terminal-dim': '#003b00',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        // We might drop sans entirely to strictly match the reference, or use it sparingly
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #003b00 1px, transparent 1px), linear-gradient(to bottom, #003b00 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
