import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";

const root = process.cwd();

export const getFiles = async ({ type }: { type: string }) =>
  fs.readdirSync(path.join(root, "data", type));

export const getFileBySlug = async ({
  type,
  slug,
}: {
  type: string;
  slug: string;
}) => {
  const mdxSource = fs.readFileSync(
    path.join(root, "data", type, `${slug}.mdx`),
    "utf-8"
  );

  const { data, content } = matter(mdxSource);

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, require("remark-code-titles")],
      rehypePlugins: [require("@mapbox/rehype-prism")],
    },
  });

  return {
    source,
    frontmatter: {
      readingTime: readingTime(content),
      slug,
      ...data,
    },
  };
};

export const getFilesFrontmatter = async ({ type }: { type: string }) => {
  const files = fs.readdirSync(path.join(root, "data", type));

  return files.reduce((allPosts: any, slug) => {
    const mdxSource = fs.readFileSync(
      path.join(root, "data", type, slug),
      "utf-8"
    );

    const { data } = matter(mdxSource);

    return [{ ...data, slug: slug.replace(".mdx", "") }, ...allPosts];
  }, []);
};
