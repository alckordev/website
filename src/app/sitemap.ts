import { routing } from "@/i18n/routing";
import { getPostsInfo } from "@/lib/server";
import { MetadataRoute } from "next";
import topics from "@/assets/data/topics.json";
import slugify from "slugify";

const SITE_URL = process.env.SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales;

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${SITE_URL}/es`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${SITE_URL}/es/blog`,
          en: `${SITE_URL}/en/blog`,
        },
      },
    },
  ];

  const postsByLocale: Record<
    string,
    { slug: string; publishedAt?: string }[]
  > = {};

  const topicsByLocale: Record<
    string,
    { slug: string; publishedAt?: string }[]
  > = {};

  for (const locale of locales) {
    const posts = await getPostsInfo(`posts/${locale}`);
    postsByLocale[locale] = posts.map((p) => ({
      slug: p.slug,
      publishedAt: p.publishedAt,
    }));

    topicsByLocale[locale] = topics.map((t) => ({
      slug: slugify(t, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        trim: true,
      }),
    }));
  }

  for (const locale of locales) {
    const posts = postsByLocale[locale];

    for (const post of posts) {
      const slug = post.slug;
      const url = `${SITE_URL}/${post.slug}`;
      const lastMod = post.publishedAt
        ? new Date(post.publishedAt)
        : new Date();

      const alternates: Record<string, string> = {};

      for (const locale of locales) {
        alternates[locale] = `${SITE_URL}/${locale}/${slug}`;
      }

      entries.push({
        url,
        lastModified: lastMod,
        ...(Object.keys(alternates).length
          ? {
              alternates: {
                languages: alternates,
              },
            }
          : {}),
      });
    }

    const topics = topicsByLocale[locale];

    for (const topic of topics) {
      const slug = `topics/${topic.slug}`;
      const url = `${SITE_URL}/${slug}`;
      const lastMod = topic.publishedAt
        ? new Date(topic.publishedAt)
        : new Date();

      const alternates: Record<string, string> = {};

      for (const locale of locales) {
        alternates[locale] = `${SITE_URL}/${locale}/${slug}`;
      }

      entries.push({
        url,
        lastModified: lastMod,
        ...(Object.keys(alternates).length
          ? {
              alternates: {
                languages: alternates,
              },
            }
          : {}),
      });
    }
  }

  return entries;
}
