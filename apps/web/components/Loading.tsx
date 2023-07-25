import { UI } from "@myth/ui";

export const Loading = () => {
  return (
    <UI.Flex
      align="center"
      justify="center"
      width="100vw"
      height="100vh"
      gap={2}
    >
      <UI.Spinner />
      <UI.Text>Loading...</UI.Text>
    </UI.Flex>
  );
};
