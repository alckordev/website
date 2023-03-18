import { UI } from "@myth/ui";

export const SkeletonLastedVideo = ({ ...rest }) => {
  return (
    <UI.Flex minW="100%" align="center" {...rest}>
      <UI.Box minW={100} mr={4}>
        <UI.Skeleton w={100} h={70} />
      </UI.Box>
      <UI.Box minW="calc(100% - 100px - 1rem)">
        <UI.SkeletonText noOfLines={1} mb={2} width={100} />
        <UI.SkeletonText noOfLines={2} spacing={2} />
      </UI.Box>
    </UI.Flex>
  );
};
