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
        primary: '#3D55FF',
        secondary: '#FF3D6E',
        accent: '#00CCBB',
        green: '#00CC81',
        grey: '#222222',
        darkgradient: 'linear-gradient(135deg, #222222 0%, #444444 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')],
  daisyui: {
    themes: [
      {
        marketing: {
          "primary": "#3D55FF",
          "secondary": "#FF3D6E",
          "accent": "#00CCBB",
          "neutral": "#222222",
          "base-100": "#FFFFFF",
          "base-200": "#F7F7F7",
          "base-300": "#EEEEEE",
        },
      },
    ],
  },
} 