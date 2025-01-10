module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mobileComponents/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#45B7D1',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Roboto Mono', 'Courier New', 'monospace','Transformers'],
        jersey: ['Jersey15', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')],
  daisyui: {
    themes: [
      {
        metaloot: {
          "primary": "#FF6B6B",
          "secondary": "#4ECDC4",
          "accent": "#45B7D1",
          "neutral": "#1a1a1a",
          "base-100": "#0F1115",
          "base-200": "#16181D",
          "base-300": "#202227",
        },
      },
    ],
  },
} 