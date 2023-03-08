import { UI, useColorModeValue } from "@myth/ui";

export const MDXComponent = {
  a: (props: any) => (
    <UI.Link
      isExternal
      color={useColorModeValue("purple.700", "purple.300")}
      {...props}
    />
  ),
  hr: UI.Divider,
  h1: (props: any) => <UI.Heading as="h1" my={8} size="lg" {...props} />,
  h2: (props: any) => <UI.Heading as="h2" my={4} size="lg" {...props} />,
  h3: (props: any) => <UI.Heading as="h3" my={4} size="md" {...props} />,
  h4: (props: any) => <UI.Heading as="h4" my={2} size="md" {...props} />,
  h5: (props: any) => <UI.Heading as="h5" my={2} size="sm" {...props} />,
  h6: (props: any) => <UI.Heading as="h6" my={2} size="sm" {...props} />,
  p: (props: any) => <UI.Text fontSize="md" lineHeight={6} my={8} {...props} />,
  pre: (props: any) => <UI.Box as="pre" my={8} {...props} />,
  // code: (props: any) => <UI.Code colorScheme="yellow" {...props} />,
};
