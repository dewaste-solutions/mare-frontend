import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        formPrimary: 'rgba(3, 129, 103, 0.53)'
      },
      fontFamily: {
        'tt-commons': ['TT Commons', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;