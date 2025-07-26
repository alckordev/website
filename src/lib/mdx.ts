import fs from "fs";
import matter from "gray-matter";
// import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";
// import remarkGfm from "remark-gfm";

const root = path.join(process.cwd(), "data");

export const getByDirectory = (dir: string = "") => {
  const dirPath = path.join(root, dir);
  const paths: string[] = [];

  function readDirectory(dir: string) {
    fs.readdirSync(dir).forEach((file) => {
      const absolutePath = path.join(dir, file);

      if (fs.statSync(absolutePath).isDirectory()) {
        readDirectory(absolutePath);
      } else if (absolutePath.endsWith(".mdx")) {
        paths.push(absolutePath.replace(root + path.sep, ""));
      }
    });
  }

  readDirectory(dirPath);

  return paths;
};

export const getFrontMatter = async (dir: string = "") => {
  const files = getByDirectory(dir);

  return files.map((file) => {
    const absolutePath = path.join(root, file);

    const mdx = fs.readFileSync(absolutePath, "utf-8");
    const { data } = matter(mdx);
    const slug = path.basename(file, ".mdx");

    return {
      ...data,
      slug,
    };
  });
};

export const getBySlug = async (slug: string) => {
  const absolutePath = path.join(root, `${slug}.mdx`);
  const mdx = fs.readFileSync(absolutePath, "utf-8");
  const { data, content } = matter(mdx);

  // const source = await serialize(content, {
  //   mdxOptions: {
  //     remarkPlugins: [remarkGfm, require("remark-code-titles")],
  //     rehypePlugins: [require("@mapbox/rehype-prism")],
  //   },
  // });

  return {
    content,
    // source,
    matter: {
      ...data,
      slug,
      reading: readingTime(content),
    },
  };
};
