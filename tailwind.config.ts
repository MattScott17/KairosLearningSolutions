import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the Kairos tree logo
        forest: {
          50: "#f4f7ec",
          100: "#e6eecf",
          200: "#cfe0a4",
          300: "#b2cd73",
          400: "#94b74a",
          500: "#7cb342", // leaf green — primary accent
          600: "#5f8c2f",
          700: "#4a6d26",
          800: "#3d5310", // deep olive — headings / primary
          900: "#2f3f11",
          950: "#18220a",
        },
        cream: "#faf8f2",
        sand: "#f2eede",
        ink: "#26241d",
        gold: {
          400: "#e6b64c",
          500: "#e0a23c",
          600: "#c4842a",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(61, 83, 16, 0.18)",
        card: "0 4px 24px -8px rgba(38, 36, 29, 0.12)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
      backgroundImage: {
        "leaf-texture":
          "radial-gradient(circle at 20% 20%, rgba(124,179,66,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(224,162,60,0.06), transparent 35%)",
      },
    },
  },
  plugins: [],
};

export default config;
