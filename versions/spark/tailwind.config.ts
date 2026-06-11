import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      keyframes: {
        "card-enter": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translate(-50%, -12px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(6%, 4%) scale(1.08)" },
        },
      },
      animation: {
        "card-enter": "card-enter 320ms cubic-bezier(0.21, 1.02, 0.45, 1) both",
        "toast-in": "toast-in 220ms cubic-bezier(0.21, 1.02, 0.45, 1) both",
        "fade-up": "fade-up 360ms cubic-bezier(0.21, 1.02, 0.45, 1) both",
        "glow-drift": "glow-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
