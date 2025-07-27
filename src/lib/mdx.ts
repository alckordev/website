import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

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

  return {
    content,
    matter: {
      ...data,
      slug,
      reading: readingTime(content),
    },
  };
};
