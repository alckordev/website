import { CodeHighlight } from "@mantine/code-highlight";
import { Code } from "@mantine/core";

export const CodeBlock = ({
  className,
  children,
}: React.HTMLAttributes<HTMLElement>) => {
  const match = /language-(\w+)/.exec(className ?? "");
  const code = String(children).trim();

  if (match) {
    return (
      <CodeHighlight
        language={match[1]}
        code={code}
        radius="md"
        withBorder
        // defaultExpanded={false}
        // withExpandButton
      />
    );
  }

  return <Code>{code}</Code>;
};
