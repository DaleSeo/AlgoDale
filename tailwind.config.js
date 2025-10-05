import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Keep CSS variables as the source of truth; Tailwind utilities point to them.
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        background: "var(--color-background)",
        "background-secondary": "var(--color-background-secondary)",
        text: "var(--color-text)",
        headline: "var(--color-headline)",
        paragraph: "var(--color-paragraph)",
        gray: "var(--color-gray)",
        "gray-1000": "var(--color-gray-1000)",
        overlay: "var(--color-overlay)",
      },
      spacing: {
        15: "3.75rem",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              "&:hover": {
                color: theme("colors.primary"),
              },
            },
            h2: {
              color: theme("colors.secondary"),
            },
            blockquote: {
              background: theme("colors.background"),
              borderLeft: `5px solid ${theme("colors.primary")}`,
              borderRadius: `0 ${theme("spacing.2")} ${theme("spacing.2")} 0`,
              paddingBlock: "0.3em",
              paddingRight: "0.7em",
            },
            code: {
              background: theme("colors.background"),
              padding: "4px 6px",
              borderRadius: "3px",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
