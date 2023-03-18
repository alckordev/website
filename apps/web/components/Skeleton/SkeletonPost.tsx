import { UI } from "@myth/ui";

export const SkeletonPost = ({ ...rest }) => {
  return (
    <UI.Box {...rest}>
      <UI.SkeletonText noOfLines={1} spacing={4} mb={4} width="30%" />
      <UI.SkeletonText noOfLines={2} spacing={4} mb={4} skeletonHeight={4} />

      <UI.Skeleton maxW={720} minH={480} my={7} mx="auto" />
      <UI.SkeletonText noOfLines={10} spacing={4} />
    </UI.Box>
  );
};
