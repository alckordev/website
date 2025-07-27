import { HighlightProvider } from "@/components/highlight-provider";

export const metadata = {
  title: "Lorem ipsum... — Alckor DEV — Software developer",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HighlightProvider>{children}</HighlightProvider>;
}
