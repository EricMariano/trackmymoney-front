import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      colors: {
        primarydark: "#059669",
        accent: "#F59E0B",
        info: "#6366F1",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#10B981",
            foreground: "#FFFFFF",
          },
          primarydark: {
            DEFAULT: "#059669",
            foreground: "#FFFFFF",
          },
          secondary: {
            DEFAULT: "#3B82F6",
            foreground: "#FFFFFF",
          },
          success: {
            DEFAULT: "#10B981",
            foreground: "#FFFFFF",
          },
          danger: {
            DEFAULT: "#EF4444",
            foreground: "#FFFFFF",
          },
          warning: {
            DEFAULT: "#F59E0B",
            foreground: "#FFFFFF",
          },
          focus: "#6366F1",
        },
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#10B981",
            foreground: "#FFFFFF",
          },
          secondary: {
            DEFAULT: "#3B82F6",
            foreground: "#FFFFFF",
          },
          success: {
            DEFAULT: "#10B981",
            foreground: "#FFFFFF",
          },
          danger: {
            DEFAULT: "#EF4444",
            foreground: "#FFFFFF",
          },
          warning: {
            DEFAULT: "#F59E0B",
            foreground: "#FFFFFF",
          },
          focus: "#6366F1",
        },
      },
    },
  })],
}

module.exports = config;