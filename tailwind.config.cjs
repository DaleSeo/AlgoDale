/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ebc7",
        secondary: "#ff526f",
        tertiary: "#9be688",
        background: "#f3f5f7",
        text: "#001126",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
