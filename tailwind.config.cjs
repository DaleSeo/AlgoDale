/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#815cf0",
        secondary: "#209B74",
        tertiary: "#9be688",
        background: "#f3f5f7",
        text: "#151519",
      },
      typography: (theme) => ({
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
  plugins: [require("@tailwindcss/typography")],
};
