import { HStack } from "@chakra-ui/react";
import { NavBarItem } from "./NavBarItem";

interface Props {
  isMobile: boolean;
  navs: {
    name: string;
    to: string;
  }[];
}

export const NavBarList = ({ isMobile = false, navs }: Props) => {
  if (isMobile) return null;

  return (
    <HStack as="nav" spacing={10}>
      {navs.map((nav, idx) => (
        <NavBarItem key={idx} to={nav.to}>
          {nav.name}
        </NavBarItem>
      ))}
    </HStack>
  );
};
