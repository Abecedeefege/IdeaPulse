import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0b",
          card: "#111113",
        },
        violet: {
          ink: "#7c3aed",
          soft: "#a78bfa",
        },
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
