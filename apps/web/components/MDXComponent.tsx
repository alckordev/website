import { UI, CIcon, icon, useColorModeValue } from "@myth/ui";
import { CustomAlert } from "./CustomAlert";
import { CustomImage } from "./CustomImage";

const CustomLink = (props: any) => {
  const color = useColorModeValue("purple.700", "purple.300");

  return <UI.Link isExternal color={color} {...props} />;
};

const CustomListItem = (props: any) => {
  const color = useColorModeValue("purple.700", "purple.300");

  return (
    <UI.ListItem pos="relative">
      <UI.Box
        as={CIcon}
        icon={icon.bxTag}
        pos="absolute"
        top="5px"
        color={color}
      />
      <UI.Box ml={6}>{props.children}</UI.Box>
    </UI.ListItem>
  );
};

export const MDXComponent = {
  a: (props: any) => <CustomLink {...props} />,
  hr: UI.Divider,
  h1: (props: any) => (
    <UI.Heading as="h1" my={8} size={["lg", "lg", "xl", "xl"]} {...props} />
  ),
  h2: (props: any) => (
    <UI.Heading as="h2" my={4} size={["md", "md", "lg", "lg"]} {...props} />
  ),
  h3: (props: any) => <UI.Heading as="h3" my={4} size="md" {...props} />,
  h4: (props: any) => <UI.Heading as="h4" my={2} size="md" {...props} />,
  h5: (props: any) => <UI.Heading as="h5" my={2} size="sm" {...props} />,
  h6: (props: any) => <UI.Heading as="h6" my={2} size="sm" {...props} />,
  p: (props: any) => <UI.Text fontSize="md" lineHeight={6} my={8} {...props} />,
  pre: (props: any) => <UI.Box as="pre" my={8} {...props} />,
  ul: (props: any) => <UI.UnorderedList styleType="none" my={8} {...props} />,
  ol: (props: any) => <UI.OrderedList styleType="none" my={8} {...props} />,
  li: (props: any) => <CustomListItem {...props} />,
  CustomAlert,
  CustomImage,
};
