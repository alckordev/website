import styled from "@emotion/styled";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";

const StyledLink = styled(Link)`
  font-size: var(--chakra-fontSizes-xl);
  font-weight: var(--chakra-fontWeights-bold);
  text-transform: uppercase;
  padding-top: var(--chakra-space-3);
  padding-bottom: var(--chakra-space-3);
  &:hover {
    text-decoration: none;
    transform: scale(1.1);
  }
`;

interface Props {
  children: React.ReactNode;
  to: string;
}

export const NavBarDrawerItem = ({ children, to, ...rest }: Props) => {
  return (
    <StyledLink as={NextLink} href={to} {...rest}>
      <Text>{children}</Text>
    </StyledLink>
  );
};
