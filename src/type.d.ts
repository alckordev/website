export type Params = Promise<{ locale: string; slug?: string }>;

export type LayoutProps = {
  children: React.ReactNode;
  auth: React.ReactNode;
};

export type LayoutWithParamsProps = LayoutProps & {
  params: Params;
};

export type Frontmatter = {
  title: string;
  summary?: string;
  publishedAt: string;
  cover?: string;
  topics?: string[];
};

export type Scope = {
  reading: number;
  toc?: Toc;
  [key: string]: unknown;
};

export type PostInfo = Frontmatter & { slug: string };

export type Toc = {
  value: string;
  href: string;
  depth: number;
  numbering: number[];
  parent: string;
}[];

export type User = {
  aud: string;
  authTime: number;
  email?: string;
  emailVerified?: boolean;
  exp: number;
  iat: number;
  iss: string;
  name?: string;
  picture?: string;
  sub: string;
  uid: string;
};
