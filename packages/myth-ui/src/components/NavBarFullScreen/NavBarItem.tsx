import styled from "@emotion/styled";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";

const StyledLink = styled(Link)`
  padding-top: var(--chakra-space-3);
  padding-bottom: var(--chakra-space-3);
  &:hover {
    color: var(--chakra-colors-gray-600);
    text-decoration: none;
  }
`;

interface Props {
  children: React.ReactNode;
  to: string;
}

export const NavBarItem = ({ children, to, ...rest }: Props) => {
  return (
    <StyledLink as={NextLink} href={to} {...rest}>
      <Text>{children}</Text>
    </StyledLink>
  );
};
