import { Aside } from "@/components/layouts";
import { SkeletonText } from "@/components/skeleton-text";
import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import React from "react";

export default function BlogLoading() {
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
        <Title order={4} mb="lg">
          Latest posts
        </Title>
        <Stack gap="xl">
          <Divider />
          {Array.from({ length: 3 }).map((_, idx) => (
            <React.Fragment key={idx}>
              <Stack gap="xs">
                <Flex>
                  <Stack gap="xs" flex={1}>
                    <Skeleton w="80%" h="lg" />
                    <SkeletonText noOfLines={3} gap="xs" />
                  </Stack>
                  <Box
                    display={{ base: "none", md: "block" }}
                    flex="0 0 180px"
                    ms="50px"
                  >
                    <AspectRatio ratio={180 / 118} maw={180} mx="auto">
                      <Skeleton w={180} h={118} />
                    </AspectRatio>
                  </Box>
                </Flex>
              </Stack>
              {idx + 1 !== 3 && <Divider />}
            </React.Fragment>
          ))}
        </Stack>
      </Box>
      <Aside />
    </Flex>
  );
}
