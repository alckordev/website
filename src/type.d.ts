export type Params = Promise<{ locale: string; slug?: string }>;

export type LayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export type LayoutWithParamsProps = LayoutProps & {
  params: Params;
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
