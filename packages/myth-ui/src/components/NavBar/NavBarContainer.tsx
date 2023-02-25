import React from "react";
import { Container, Flex } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const NavBarContainer = ({ children, ...rest }: Props) => {
  return (
    <Container maxW="container.md">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        py={8}
        {...rest}
      >
        {children}
      </Flex>
    </Container>
  );
};
