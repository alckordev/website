import React from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const NavBarContainer = ({ children, ...rest }: Props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      {...rest}
    >
      {children}
    </Flex>
  );
};
