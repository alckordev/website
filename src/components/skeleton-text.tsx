import { Skeleton, Stack, StackProps } from "@mantine/core";

interface SkeletonTextProps {
  noOfLines?: number;
  gap?: StackProps["gap"];
}

export const SkeletonText = ({ noOfLines = 1, gap }: SkeletonTextProps) => {
  if (noOfLines === 1) return <Skeleton w="100%" h="md" />;

  return (
    <Stack gap={gap}>
      {Array.from({ length: noOfLines }).map((_, idx) => (
        <Skeleton key={idx} w={idx + 1 === noOfLines ? "80%" : "100%"} h="md" />
      ))}
    </Stack>
  );
};
