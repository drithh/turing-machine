module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          indigo: '#2D3748',
          blue: '#1F5F77',
          cyan: '#008A94',
          orange: '#FDBA74',
          meadow: '#28B595',
          green: '#8DDB82',
          yellow: '#F9F871',
        },
      },
      fontFamily: {
        sans: ['Segoe UI'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
