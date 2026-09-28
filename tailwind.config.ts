import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFBF7",
          100: "#F9F6EE",
          200: "#F3EDE0",
          300: "#E8DFC8",
          400: "#D6C6A4",
          500: "#BC9E73",
        },
        sage: {
          50: "#F3F7F4",
          100: "#E3ECE5",
          200: "#C7D8CC",
          300: "#A2BEAA",
          400: "#7CA287",
          500: "#4D7C5D",
          600: "#3D664B",
          700: "#31523D",
          800: "#274232",
          900: "#1C3125",
        },
        terracotta: {
          50: "#FDF5F2",
          100: "#FBE7E1",
          200: "#F6D1C6",
          300: "#EDB1A0",
          400: "#E28B72",
          500: "#C85A32",
          600: "#B34A25",
          700: "#943A1B",
          800: "#793118",
          900: "#632B18",
        },
        honey: {
          50: "#FEF9EE",
          100: "#FDF1D5",
          200: "#FBE0A6",
          300: "#F7CB6D",
          400: "#EEB236",
          500: "#D99313",
          600: "#B8730D",
          700: "#91520F",
        },
        waste: {
          organic: {
            bg: "#F7F0EB",
            border: "#D7B9A5",
            badge: "#8D5338",
            light: "#FAF4F0",
            dark: "#6B3822",
          },
          paper: {
            bg: "#EFF6FF",
            border: "#BFDBFE",
            badge: "#2563EB",
            light: "#F0F7FF",
            dark: "#1D4ED8",
          },
          plastic: {
            bg: "#FEFCE8",
            border: "#FEF08A",
            badge: "#CA8A04",
            light: "#FEFDF0",
            dark: "#A16207",
          },
          glass: {
            bg: "#F0FDF4",
            border: "#BBF7D0",
            badge: "#16A34A",
            light: "#F2FDF5",
            dark: "#15803D",
          },
          residual: {
            bg: "#F3F4F6",
            border: "#E5E7EB",
            badge: "#4B5563",
            light: "#F9FAFB",
            dark: "#1F2937",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(139, 90, 43, 0.06), 0 2px 6px -1px rgba(139, 90, 43, 0.04)",
        "warm-md": "0 10px 30px -4px rgba(139, 90, 43, 0.08), 0 4px 12px -2px rgba(139, 90, 43, 0.05)",
        "warm-lg": "0 20px 40px -6px rgba(139, 90, 43, 0.12), 0 8px 16px -3px rgba(139, 90, 43, 0.06)",
        soft: "0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
