import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { NavBarContainer } from "./NavBarContainer";
import { MenuToggle } from "./MenuToggle";
import { MenuLinks } from "./MenuLinks";
import { Logo } from "./Logo";

const StyledNavbar = styled.header<{ isScrolled: boolean }>`
  background-color: var(--chakra-colors-gray-800);
  color: var(--chakra-colors-gray-300);
  font-family: var(--chakra-fonts-heading);
  top: 0;
  transition: box-shadow 0.2s ease 0s, background-color 0.2s ease 0s;
  position: sticky;
  z-index: 2;
  box-shadow: ${(props) =>
    props.isScrolled ? "var(--chakra-shadows-sm)" : "none"};
`;

interface Props {
  navs: {
    name: string;
    url: string;
  }[];
  isScrolled: boolean;
}

export const NavBar = ({ navs, isScrolled = false, ...rest }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <StyledNavbar isScrolled={isScrolled}>
      <NavBarContainer {...rest}>
        <Logo w="100px" color={["white", "white", "brand.500", "brand.500"]} />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} navs={navs} />
      </NavBarContainer>
    </StyledNavbar>
  );
};
