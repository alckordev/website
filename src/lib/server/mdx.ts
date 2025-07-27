import fs from "fs";
import path from "path";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { Frontmatter, PostInfo } from "@/type";

const DATA_DIR = path.join(process.cwd(), "data");

/* ──────────────────────────────── helpers ──────────────────────────────── */

/** Return the absolute path for a given slug (.mdx) */
const mdxPath = (slug: string) => path.join(DATA_DIR, `${slug}.mdx`);

/** Read an .mdx file; return undefined if it does not exist */
const readMdx = (slug: string): string | undefined => {
  const filePath = mdxPath(slug);
  return fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : undefined;
};

/** Type‑guard to filter out undefined values */
const isPostInfo = (value: PostInfo | undefined): value is PostInfo =>
  value !== undefined;

/* ────────────────────────────── public API ─────────────────────────────── */

/** Get raw markdown source for a single slug (async) */
export const getPostSource = async (
  slug: string
): Promise<string | undefined> => readMdx(slug);

/** Get front‑matter for one post */
export const getPostInfo = (slug: string): PostInfo | undefined => {
  const source = readMdx(slug);
  if (!source) return;

  const { frontmatter } = getFrontmatter<Frontmatter>(source);
  return {
    ...frontmatter,
    slug: path.basename(slug, ".mdx"),
  };
};

/** List all slugs inside a directory (e.g. "es" or "en") */
export const listSlugs = (dir = ""): string[] =>
  fs
    .readdirSync(path.join(DATA_DIR, dir))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.posix.join(dir, path.basename(f, ".mdx")));

/** Get front‑matter for every post under `dir` */
export const getPostsInfo = async (dir = ""): Promise<PostInfo[]> => {
  const slugs = listSlugs(dir);
  return slugs.map(getPostInfo).filter(isPostInfo); // -> guaranteed PostInfo[]
};
