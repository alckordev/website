import { useState } from "react";
import styled from "@emotion/styled";
import { NavBarContainer } from "./NavBarContainer";
import { MenuToggle } from "./MenuToggle";
import { MenuLinks } from "./MenuLinks";
import { Logo } from "./Logo";

const StyledNavbar = styled.header`
  background-color: var(--chakra-colors-secondary-900);
  color: var(--chakra-colors-white);
  position: sticky;
  z-index: 2;
`;

export const NavBar = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <StyledNavbar>
      <NavBarContainer {...props}>
        <Logo
          w="100px"
          color={["white", "white", "primary.500", "primary.500"]}
        />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </NavBarContainer>
    </StyledNavbar>
  );
};
