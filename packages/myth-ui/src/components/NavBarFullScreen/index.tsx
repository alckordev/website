import { useState } from "react";
import styled from "@emotion/styled";
import { Box, Flex, useMediaQuery, useColorModeValue } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavBarContainer } from "./NavBarContainer";
import { NavBarControl } from "./NavBarControl";
import { NavBarDrawer } from "./NavBarDrawer";
import { NavBarDrawerList } from "./NavBarDrawerList";
import { NavBarList } from "./NavBarList";

const StyledNavbar = styled(Box)<{ isScrolled: boolean }>`
  background: var(--chakra-colors-chakra-body-bg);
  box-shadow: ${(props) =>
    props.isScrolled ? "var(--chakra-shadows-sm)" : "none"};
  font-family: var(--chakra-fonts-heading);
  position: sticky;
  top: 0;
  left: 0;
  transition: all 50ms ease 0s;
  z-index: var(--chakra-zIndices-overlay);
`;

interface Props {
  isScrolled: boolean;
  navs: {
    name: string;
    to: string;
  }[];
}

export const NavBarFullScreen = ({
  isScrolled = false,
  navs,
  ...rest
}: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <StyledNavbar
      as="header"
      isScrolled={isScrolled}
      minW="100%"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <NavBarContainer {...rest}>
        <Logo />
        <Flex gap={8}>
          <NavBarList isMobile={isMobile} navs={navs} />
          <NavBarControl
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
