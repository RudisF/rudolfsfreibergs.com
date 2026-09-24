import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Palette shared with B:Engage (b2b-engagement.com).
// Legacy names (ink, paper, stone, rule, accent) are kept so older
// components (blog post, legal pages, styleguide) still resolve.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#050917",
        "navy-2": "#0A1128",
        sand: "#A89F88",
        cream: "#E9E3D2",
        gold: "#BA9B5F",
        "gold-deep": "#5A3F14",
        "on-navy": "#C4C9D8",
        "on-sand": "#2A2A26",
        ink: "#050917",
        paper: "#E9E3D2",
        stone: "#5B5A52",
        rule: "#B8AF97",
        accent: "#5A3F14",
        "accent-soft": "#BA9B5F33",
      },
      fontFamily: {
        // One typeface across the whole site.
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      // Custom prose theme → use as `prose prose-ink`.
      typography: {
        ink: {
          css: {
            "--tw-prose-body": "#1c1c1f",
            "--tw-prose-headings": "#050917",
            "--tw-prose-lead": "#2A2A26",
            "--tw-prose-links": "#5A3F14",
            "--tw-prose-bold": "#050917",
            "--tw-prose-counters": "#5B5A52",
            "--tw-prose-bullets": "#5B5A52",
            "--tw-prose-hr": "rgba(5,9,23,0.15)",
            "--tw-prose-quotes": "#050917",
            "--tw-prose-quote-borders": "#BA9B5F",
            "--tw-prose-captions": "#5B5A52",
            "--tw-prose-code": "#050917",
            "--tw-prose-pre-code": "#E9E3D2",
            "--tw-prose-pre-bg": "#050917",
            "--tw-prose-th-borders": "#B8AF97",
            "--tw-prose-td-borders": "rgba(5,9,23,0.12)",
            "h1, h2, h3, h4": { fontWeight: "800", letterSpacing: "-0.02em" },
            "em, i, blockquote": { fontStyle: "normal" },
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
