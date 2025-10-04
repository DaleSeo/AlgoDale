import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";

import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.algodale.com/",
  scopedStyleStrategy: "where",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    partytown(),
    sentry(),
    spotlightjs(),
    icon(),
  ],
  // markdown: {
  //   rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  // },
});
