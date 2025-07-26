import { MDXComponents } from "@/components/mdx-component";
import { getBySlug } from "@/lib";
import { PageProps } from "@/type";
// import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Article(props: PageProps) {
  const { locale, slug } = await props.params;
  const { content } = await getBySlug(`${locale}/${slug}`);

  return (
    <div>
      <h1>Welcome to new Article</h1>
      <MDXRemote components={MDXComponents} source={content} />
    </div>
  );
}
