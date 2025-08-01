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

export type Provider = "google.com" | "github.com";

export type Identity = {
  uid: string;
  providerId: Provider;
  email?: string;
};

export type User = {
  uid: string;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  picture?: string;
  providerData: Identity[];
};

export type GitEdge = {
  node: GitRepository;
};

export type GitRepository = {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
};

export type Thread = {
  uid?: string;
  identifier: string;
};
