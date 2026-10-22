import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        sand: "#F3F2EC",
        ink: "#191918",
        muted: "#777770",
        "muted-strong": "#5F5F59",
        line: "#E9E8E2",
        "line-strong": "#D6D5CC",
        lime: "#A8F36A",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "General Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: { card: "12px" },
      boxShadow: {
        mock: "0 18px 50px rgba(20,20,18,.08)",
        nav: "0 8px 24px rgba(20,20,18,.06)",
        lift: "0 10px 26px rgba(20,20,18,.06)",
      },
      transitionTimingFunction: { recall: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};

export default config;
