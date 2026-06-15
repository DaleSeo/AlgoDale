import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "~/consts";

export async function GET(context) {
  const problems = (
    await getCollection("problems", (problem) => !problem.data.draft)
  ).map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    description: post.data.description || SITE_DESCRIPTION,
    link: `/problems/${post.id}/`,
  }));

  const algorithms = (
    await getCollection("algorithms", (algorithms) => !algorithms.data.draft)
  ).map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    description: post.data.description || SITE_DESCRIPTION,
    link: `/algorithms/${post.id}/`,
  }));

  const dataStructures = (
    await getCollection(
      "data-structures",
      (dataStructures) => !dataStructures.data.draft,
    )
  ).map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    description: post.data.description || SITE_DESCRIPTION,
    link: `/data-structures/${post.id}/`,
  }));

  const guides = (
    await getCollection(
      "guides",
      (dataStructures) => !dataStructures.data.draft,
    )
  ).map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    description: post.data.description || SITE_DESCRIPTION,
    link: `/guides/${post.id}/`,
  }));

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: [...guides, ...algorithms, ...dataStructures, ...problems].sort(
      (a, b) => a.pubDate.valueOf() - b.pubDate.valueOf(),
    ),
  });
}
