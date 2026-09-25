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
        // Brand greens sampled from the Kairos logo (public/images/logo.png)
        forest: {
          50: "#f5f8ee",
          100: "#e9f0d9",
          200: "#d3e1b0",
          300: "#b5cc7c",
          400: "#9cb957",
          500: "#88a838", // logo leaf green
          600: "#6a8c1f",
          700: "#4a700a", // logo wordmark green
          800: "#3b5a08",
          900: "#2c4306",
          950: "#1a2804",
        },
        cream: "#ffffff", // page + card surface (kept as a token so text-cream still reads as white-on-green)
        sand: "#f4f5f0", // the one light neutral used for alternating bands
        ink: "#1f2319",
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
        // Content is rendered twice; shifting by half (plus half the gap between the copies) loops
        // seamlessly. Set --marquee-half-gap when the gap isn't gap-6.
        marquee: {
          to: { transform: "translateX(calc(-50% - var(--marquee-half-gap, 0.75rem)))" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee var(--marquee-duration, 50s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
