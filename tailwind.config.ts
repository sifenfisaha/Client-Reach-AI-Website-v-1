import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#14A3F6", // Primary Brand Color
          600: "#0284c7",
          900: "#0c4a6e",
          950: "#082f49",
        },
        dark: {
          bg: "#0a0a0a",
          card: "#121212",
          border: "#27272a",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


