import { LayoutProps } from "@/type";
import { Box, Flex } from "@mantine/core";

export default function Layout({ children }: LayoutProps) {
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
        w="100%"
        mx="auto"
        py={50}
        ps="md"
        pe={{ base: "md", lg: "xl" }}
      >
        {children}
      </Box>
    </Flex>
  );
}
