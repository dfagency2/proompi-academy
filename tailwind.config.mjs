/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#daefff',
          200: '#bde2ff',
          300: '#8ecfff',
          400: '#55b4ff',
          500: '#007aff',
          600: '#0062cc',
          700: '#004ea3',
          800: '#004285',
          900: '#00366b',
          950: '#002245',
        },
        neutral: {
          50: '#fbfbfd',
          100: '#f5f5f7',
          200: '#e5e5ea',
          300: '#d1d1d6',
          400: '#aeaeb2',
          500: '#8e8e93',
          600: '#636366',
          700: '#48484a',
          800: '#3a3a3c',
          900: '#1c1c1e',
          950: '#000000',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
        btn: '9999px',
        input: '1rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0,0,0,0.05)',
        card: '0 10px 40px -10px rgba(0,0,0,0.08)',
        float: '0 20px 40px -5px rgba(0,0,0,0.10)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#1c1c1e',
            a: { color: '#007aff', '&:hover': { color: '#0062cc' } },
            h1: { color: '#1c1c1e', fontWeight: '700' },
            h2: { color: '#1c1c1e', fontWeight: '600' },
            h3: { color: '#3a3a3c', fontWeight: '600' },
            code: { color: '#007aff', backgroundColor: '#eef7ff', padding: '2px 6px', borderRadius: '4px' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
