import styled from "@emotion/styled";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";

const StyledText = styled(Text)`
  font-size: var(--chakra-fontSizes-lg);
  font-weight: var(--chakra-fontWeights-bold);
  text-transform: uppercase;
  padding-top: var(--chakra-space-3);
  padding-bottom: var(--chakra-space-3);
  position: relative;
  &:hover {
    color: var(--chakra-colors-teal-200);
    &:after {
      width: 100%;
    }
  }
  &:after {
    display: block;
    position: absolute;
    top: 50%;
    content: "";
    height: 4px;
    margin-top: -2px;
    width: 0;
    left: 0;
    background-color: var(--drawer-bg);
    opacity: 0.8;
    transition: width 250ms linear;
  }
`;

interface Props {
  children: React.ReactNode;
  to: string;
}

export const NavBarDrawerItem = ({ children, to, ...rest }: Props) => {
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
