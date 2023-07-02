import { defineConfig } from "astro/config";
import prettier from "prettier-plugin-astro";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  site: "https://daleseo.com/",
  trailingSlash: "always",
  integrations: [mdx(), sitemap(), tailwind(), partytown()],
  // markdown: {
  //   rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  // },
  plugins: [prettier],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
});
