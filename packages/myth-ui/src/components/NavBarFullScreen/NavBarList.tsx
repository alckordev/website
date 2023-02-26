import { Stack } from "@chakra-ui/react";
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
    <Stack
      as="nav"
      spacing={10}
      align="center"
      justify="center"
      direction="row"
      color="gray.500"
      fontWeight="bold"
    >
      {navs.map((nav, idx) => (
        <NavBarItem key={idx} to={nav.to}>
          {nav.name}
        </NavBarItem>
      ))}
    </Stack>
  );
};
