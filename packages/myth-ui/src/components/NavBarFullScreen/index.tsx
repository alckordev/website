import { useState } from "react";
import styled from "@emotion/styled";
import { Portal, Flex, useMediaQuery } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavBarContainer } from "./NavBarContainer";
import { NavBarControl } from "./NavBarControl";
import { NavBarList } from "./NavBarList";

const StyledNavbar = styled.header<{ isScrolled: boolean }>`
  background-color: ${(props) =>
    props.isScrolled ? "rgba(0,0,0, 0.8)" : "transparent"};
  backdrop-filter: ${(props) =>
    props.isScrolled ? "saturate(180%) blur(20px)" : "none"};
  font-family: var(--chakra-fonts-heading);
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
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
    <StyledNavbar isScrolled={isScrolled}>
      <NavBarContainer {...rest}>
        <Logo />
        <Flex gap={8}>
          <NavBarList isMobile={isMobile} navs={navs} />
          <NavBarControl isMobile={isMobile} toggle={toggle} />
        </Flex>
      </NavBarContainer>

      {isMobile && isOpen && <Portal>Soy Mobile</Portal>}
    </StyledNavbar>
  );
};
