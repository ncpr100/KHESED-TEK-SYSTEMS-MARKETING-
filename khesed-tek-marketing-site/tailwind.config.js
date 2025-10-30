module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#6EE7FF',
        brand2: '#8B5CF6',
        bg: '#0e0e10',
        surface: '#17171a',
        border: '#232329',
        text: '#E7E7EA',
        muted: '#9AA0A6',
      },
      borderRadius: { xl: '14px' },
    },
  },
  plugins: [],
};
