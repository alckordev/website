import { HighlightProvider } from "@/components/highlight-provider";
import { LayoutWithParamsProps } from "@/type";

export const metadata = {
  title: "Lorem ipsum... — Alckor DEV — Software developer",
  description: "I have followed setup instructions carefully",
};

export default async function PostLayout({
  children,
  sidebar,
  params,
}: LayoutWithParamsProps) {
  console.log("PostLayout", await params);

  console.log("PostLayout.sidebar", sidebar);

  return <HighlightProvider>{children}</HighlightProvider>;
}
