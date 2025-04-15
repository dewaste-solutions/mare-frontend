import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        formPrimary: 'rgba(3, 129, 103, 0.53)',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#038167",
          foreground: "hsl(var(--primary-foreground))",
          50: "#e6f3f1",
          100: "#cce7e3",
          200: "#99cfc7",
          300: "#66b7ab",
          400: "#339f8f",
          500: "#038167",
          600: "#026853",
          700: "#024e3f",
          800: "#01342a",
          900: "#011a15",
        },
        secondary: {
          DEFAULT: "#F69C91",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#fef2f1",
          100: "#fde6e3",
          200: "#fbcdc7",
          300: "#f9b4ab",
          400: "#f7a59b",
          500: "#F69C91",
          600: "#c57d74",
          700: "#945e58",
          800: "#623e3b",
          900: "#311f1d",
        },
        tertiary: {
          DEFAULT: "#FFC539",
          foreground: "hsl(var(--tertiary-foreground))",
          50: "#fff8e6",
          100: "#fff1cc",
          200: "#ffe399",
          300: "#ffd566",
          400: "#ffc733",
          500: "#FFC539",
          600: "#cc9e2e",
          700: "#997622",
          800: "#664f17",
          900: "#33270b",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'tt-commons': ['TT Commons', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
