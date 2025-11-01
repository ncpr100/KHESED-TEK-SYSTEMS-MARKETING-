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
        // UI component colors
        background: 'var(--bg)',
        foreground: 'var(--text)',
        card: 'var(--surface)',
        'card-foreground': 'var(--text)',
        primary: 'var(--brand)',
        'primary-foreground': 'var(--bg)',
        secondary: 'var(--surface)',
        'secondary-foreground': 'var(--text)',
        'muted-foreground': 'var(--muted)',
        accent: 'var(--surface)',
        'accent-foreground': 'var(--text)',
        destructive: '#ef4444',
        'destructive-foreground': '#fef2f2',
        ring: 'var(--brand)',
        input: 'var(--border)',
      },
      borderRadius: { 
        xl: '14px',
        lg: '8px',
        md: '6px', 
      },
    },
  },
  plugins: [],
};
