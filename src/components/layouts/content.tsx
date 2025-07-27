import { Box, Container } from "@mantine/core";

export const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box component="main" role="main">
      <Container size="xl" h="100%">
        {children}
      </Container>
    </Box>
  );
};
