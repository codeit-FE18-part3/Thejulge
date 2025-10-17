import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        red: {
          100: 'var(--red-100)',
          200: 'var(--red-200)',
          300: 'var(--red-300)',
          400: 'var(--red-400)',
          500: 'var(--red-500)',
          600: 'var(--red-600)',
          700: 'var(--red-700)',
          800: 'var(--red-800)',
          900: 'var(--red-900)',
        },
        blue: {
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
        },
        green: {
          100: 'var(--green-100)',
          200: 'var(--green-200)',
        },
        white: 'var(--white)',
        black: 'var(--black)',
        background: 'var(--background)',

        'modal-frame': 'var(--modal-frame)',
        'modal-dimmed': 'var(--modal-dimmed)',
      },
      fontSize: {
        caption: [
          'var(--fs-caption)',
          { lineHeight: 'var(--lh-caption)', letterSpacing: 'var(--ls-caption)' },
        ],
        'body-s': [
          'var(--fs-body-s)',
          { lineHeight: 'var(--lh-body-s)', letterSpacing: 'var(--ls-body-s)' },
        ],
        'body-m': [
          'var(--fs-body-m)',
          { lineHeight: 'var(--lh-body-m)', letterSpacing: 'var(--ls-body-m)' },
        ],
        'body-l': [
          'var(--fs-body-l)',
          { lineHeight: 'var(--lh-body-l)', letterSpacing: 'var(--ls-body-l)' },
        ],
        modal: [
          'var(--fs-modal)',
          { lineHeight: 'var(--lh-modal)', letterSpacing: 'var(--ls-modal)' },
        ],
        'heading-s': ['var(--fs-heading-s)', { lineHeight: 'var(--lh-heading-s)' }],
        'heading-m': ['var(--fs-heading-m)', { lineHeight: 'var(--lh-heading-m)' }],
        'heading-l': [
          'var(--fs-heading-l)',
          { lineHeight: 'var(--lh-heading-l)', letterSpacing: 'var(--ls-heading-l)' },
        ],
      },
      fontFamily: {
        sans: ['SpoqaHanSansNeo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      screens: {
        mobile: '375px',
        tablet: '744px',
        desktop: '1028px',
      },
      boxShadow: {
        'inset-top': '0 -4px 25px 0 rgba(0,0,0,0.1)',
      },
      keyframes: {
        'skeleton-shimmer': {
          '0%': { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {},
  },
};
export default config;
