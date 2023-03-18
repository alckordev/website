import { UI } from "@myth/ui";

export const SkeletonPostListItem = ({ ...rest }) => {
  return (
    <UI.Box w="100%" maxW={[null, null, 680, 680]} {...rest}>
      <UI.SkeletonText width={100} noOfLines={1} />
      <UI.Flex align={[null, null, "center", "center"]}>
        <UI.Box flex="1 1 auto">
          <UI.SkeletonText noOfLines={1} mb={4} skeletonHeight={4} w="80%" />
          <UI.SkeletonText noOfLines={3} spacing={4} />
        </UI.Box>
        <UI.Box
          ml={[6, 6, "60px", "60px"]}
          minW={["80px", "80px", "112px", "112px"]}
        >
          <UI.Skeleton
            w={["80px", "80px", "112px", "112px"]}
            h={["56px", "56px", "112px", "112px"]}
          />
        </UI.Box>
      </UI.Flex>
    </UI.Box>
  );
};
