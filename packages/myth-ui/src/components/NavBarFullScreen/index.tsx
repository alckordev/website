import { useState } from "react";
import styled from "@emotion/styled";
import { Flex, useMediaQuery, useColorModeValue } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavBarContainer } from "./NavBarContainer";
import { NavBarControl } from "./NavBarControl";
import { NavBarDrawer } from "./NavBarDrawer";
import { NavBarDrawerList } from "./NavBarDrawerList";
import { NavBarList } from "./NavBarList";

const StyledNavbar = styled.header<{
  isScrolled: boolean;
  borderColor: string;
}>`
  background: var(--chakra-colors-chakra-body-bg);
  box-shadow: ${(props) =>
    props.isScrolled ? "var(--chakra-shadows-sm)" : "none"};
  font-family: var(--chakra-fonts-heading);
  position: sticky;
  top: 0;
  left: 0;
  transition: all 50ms ease 0s;
  border: 1px solid ${(props) => props.borderColor};
  z-index: var(--chakra-zIndices-overlay);
`;

interface Props {
  loggedIn?: any;
  signInButton?: any;
  signOutButton?: any;
  isScrolled: boolean;
  navs: {
    name: string;
    to: string;
  }[];
}

export const NavBarFullScreen = ({
  loggedIn,
  signInButton,
  signOutButton,
  isScrolled = false,
  navs,
  ...rest
}: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const borderColor = useColorModeValue(
    "var(--chakra-colors-gray-200)",
    "var(--chakra-colors-gray-900)"
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <StyledNavbar isScrolled={isScrolled} borderColor={borderColor}>
      <NavBarContainer {...rest}>
        <Logo />
        <Flex gap={8}>
          <NavBarList isMobile={isMobile} navs={navs} />
          <NavBarControl
            loggedIn={loggedIn}
            signInButton={signInButton}
            signOutButton={signOutButton}
            isMobile={isMobile}
            hasItems={navs.length > 0}
            toggle={toggle}
          />
        </Flex>
      </NavBarContainer>

      {navs.length > 0 && (
        <NavBarDrawer isMobile={isMobile} isOpen={isOpen} toggle={toggle}>
          <NavBarDrawerList navs={navs} />
        </NavBarDrawer>
      )}
    </StyledNavbar>
  );
};
