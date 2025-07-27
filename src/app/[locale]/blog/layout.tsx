import { LayoutWithParamsProps } from "@/type";
import { Box, Flex } from "@mantine/core";

export const metadata = {
  title: "Blog — Alckor DEV — Software developer",
  description: "I have followed setup instructions carefully",
};

export default async function BlogLayout({
  children,
  sidebar,
  params,
}: LayoutWithParamsProps) {
  console.log("BlogLayout", await params);
  console.log("BlogLayout.sidebar", sidebar);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-evenly"
      mx="-md"
      mih="100%"
    >
      <Box
        flex="1 1 auto"
        maw={{ sm: 728, md: 790 }}
        mx="auto"
        py={50}
        ps="md"
        pe={{ base: "md", lg: "xl" }}
      >
        {children}
      </Box>
      {/* {sidebar} */}
    </Flex>
  );
}
