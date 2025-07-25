import { Box, Stack } from "@mantine/core";

export const Aside = () => {
  return (
    <Box
      miw={{ lg: 352, xl: 368 }}
      maw={{ lg: 352, xl: 368 }}
      mih="100%"
      py={50}
      ps={{ base: "md", lg: "xl" }}
      pe="md"
      bd={{ base: 0, lg: "1px solid var(--mantine-accent-surface)" }}
      style={{
        borderTop: 0,
        borderBottom: 0,
        borderRight: 0,
      }}
    >
      <Stack>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </Stack>
    </Box>
  );
};
