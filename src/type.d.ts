export type PageProps = {
  params: Promise<{ locale: string; slug?: string }>;
};

export type Frontmatter = {
  title: string;
  summary: string;
  publishedAt: string;
};

export type Scope = {
  reading: number;
  [key: string]: unknown;
};

export type PostInfo = Frontmatter & { slug: string };
