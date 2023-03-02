import styled from "@emotion/styled";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";

const StyledLink = styled(Link)`
  font-weight: var(--chakra-fontWeights-bold);
  padding-top: var(--chakra-space-3);
  padding-bottom: var(--chakra-space-3);
  &:hover {
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
