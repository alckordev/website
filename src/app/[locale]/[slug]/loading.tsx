import { SkeletonText } from "@/components/skeleton-text";
import { Group, Skeleton, Stack } from "@mantine/core";
import React from "react";

export default function Loading() {
  return (
    <React.Fragment>
      <Stack gap="xl" mb="xl">
        <Skeleton h="xl" />
        <Group>
          <Skeleton w={100} h="md" />
          <Skeleton w={100} h="md" />
        </Group>
        <Skeleton
          maw={{ sm: 728, md: 790 }}
          w="100%"
          h={{ base: 300, sm: 390, md: 420 }}
        />
      </Stack>
      <SkeletonText noOfLines={4} />
    </React.Fragment>
  );
}
