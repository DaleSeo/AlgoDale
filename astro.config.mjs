import { defineConfig } from "astro/config";
import prettier from "prettier-plugin-astro";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind()],
  plugins: [prettier],
  overrides: [{
    files: "*.astro",
    options: {
      parser: "astro"
    }
  }]
});