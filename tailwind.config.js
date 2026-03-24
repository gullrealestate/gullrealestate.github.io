/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ds: {
          bg:               '#0d0d0c',
          surface:          '#111110',
          'surface-low':    '#161615',
          'surface-high':   '#1e1e1d',
          'surface-highest':'#2a2a29',
          border:           'rgba(20,184,166,0.08)',
          'border-strong':  'rgba(20,184,166,0.2)',
          on:               '#eae7e4',
          'on-dim':         'rgba(234,231,228,0.55)',
          'on-faint':       'rgba(234,231,228,0.3)',
          primary:          '#14b8a6',
          'primary-dark':   '#0d0d0c',
          'primary-muted':  'rgba(20,184,166,0.12)',
          secondary:        '#e9c176',
          'secondary-dark': '#412d00',
          'secondary-muted':'rgba(233,193,118,0.12)',
          error:            '#f28b82',
        }
      },
      fontFamily: {
        headline: ['"Manrope"', 'sans-serif'],
        serif:    ['"Playfair Display"', 'serif'],
        body:     ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '2px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
