import styled from "@emotion/styled";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";

const StyledText = styled(Text)`
  font-size: var(--chakra-fontSizes-md);
  padding-top: var(--chakra-space-3);
  padding-bottom: var(--chakra-space-3);
  position: relative;
  &:hover {
    color: var(--chakra-colors-teal-200);
  }
`;

interface Props {
  children: React.ReactNode;
  to: string;
}

export const NavBarItem = ({ children, to, ...rest }: Props) => {
  return (
    <Link
      as={NextLink}
      href={to}
      display="block"
      _hover={{ textDecor: "none" }}
      {...rest}
    >
      <StyledText>{children}</StyledText>
    </Link>
  );
};
