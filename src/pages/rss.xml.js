import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "~/consts";

export async function get(context) {
  const posts = await getCollection(
    "problems",
    (problem) => !problem.data.draft
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      console.log(post.data);
      console.log(post.slug);
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || SITE_DESCRIPTION,
        link: `/problems/${post.slug}/`,
      };
    }),
  });
}
