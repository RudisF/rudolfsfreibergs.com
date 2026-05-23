import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0d",
        paper: "#f4f3ee",
        stone: "#a8a8a3",
        rule: "#26262c",
        accent: "#2f4cff",
        "accent-soft": "#1d3bff33",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      // Custom "ink" prose theme → use as `prose prose-ink`.
      typography: {
        ink: {
          css: {
            "--tw-prose-body": "#1c1c1f",
            "--tw-prose-headings": "#0b0b0d",
            "--tw-prose-lead": "#5a5a57",
            "--tw-prose-links": "#2f4cff",
            "--tw-prose-bold": "#0b0b0d",
            "--tw-prose-counters": "#a8a8a3",
            "--tw-prose-bullets": "#a8a8a3",
            "--tw-prose-hr": "rgba(11,11,13,0.12)",
            "--tw-prose-quotes": "#0b0b0d",
            "--tw-prose-quote-borders": "#2f4cff",
            "--tw-prose-captions": "#a8a8a3",
            "--tw-prose-code": "#0b0b0d",
            "--tw-prose-pre-code": "#f4f3ee",
            "--tw-prose-pre-bg": "#0b0b0d",
            "--tw-prose-th-borders": "#26262c",
            "--tw-prose-td-borders": "rgba(11,11,13,0.12)",
            "h1, h2, h3, h4": { fontFamily: "var(--font-fraunces)" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            maxWidth: "70ch",
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
