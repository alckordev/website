import { Suspense } from "react";
import { getBySlug } from "@/lib";
import { PageProps } from "@/type";
import { MDXRemote, MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";

export default async function Article(props: PageProps) {
  const { locale, slug } = await props.params;
  const { content } = await getBySlug(`${locale}/${slug}`);

  const options: MDXRemoteOptions = {
    parseFrontmatter: true,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MDXRemote source={content} options={options} components={components} />
    </Suspense>
  );
}
