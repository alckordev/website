export type PageProps = {
  params: Promise<{ locale: string; slug?: string }>;
};

export type PostMatter = {
  title?: string;
  summary?: string;
  publishedAt?: string;
  slug: string;
};
