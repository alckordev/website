import { VStack } from "@chakra-ui/react";
import { NavBarDrawerItem } from "./NavBarDrawerItem";

interface Props {
  navs: {
    name: string;
    to: string;
  }[];
}

export const NavBarDrawerList = ({ navs }: Props) => {
  return (
    <VStack as="nav">
      {navs.map((nav, idx) => (
        <NavBarDrawerItem key={idx} to={nav.to}>
          {nav.name}
        </NavBarDrawerItem>
      ))}
    </VStack>
  );
};
