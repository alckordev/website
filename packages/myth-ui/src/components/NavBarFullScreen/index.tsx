import { useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  ButtonGroup,
  Flex,
  useMediaQuery,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { Logo } from "./Logo";
import { NavBarContainer } from "./NavBarContainer";
import { NavBarDrawer } from "./NavBarDrawer";
import { NavBarDrawerList } from "./NavBarDrawerList";
import { NavBarList } from "./NavBarList";
import { riMenuLine, riMoonFill, riSunFill } from "../../icons";

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
  user?: any;
  signInButton?: any;
  signOutButton?: any;
  isScrolled: boolean;
  navs: {
    name: string;
    to: string;
  }[];
}

export const NavBarFullScreen = ({
  user,
  signInButton: SignInButton,
  signOutButton: SignOutButton,
  isScrolled = false,
  navs,
  ...rest
}: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const { colorMode, toggleColorMode } = useColorMode();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <StyledNavbar
      isScrolled={isScrolled}
      borderColor={useColorModeValue(
        "var(--chakra-colors-gray-200)",
        "var(--chakra-colors-gray-900)"
      )}
    >
      <NavBarContainer {...rest}>
        <Logo />
        <Flex gap={8}>
          <NavBarList isMobile={isMobile} navs={navs} />

          <ButtonGroup alignItems="center">
            <Button onClick={toggleColorMode} variant="ghost" p={0}>
              <CIcon icon={colorMode === "dark" ? riMoonFill : riSunFill} />
            </Button>

            {user ? (
              <SignOutButton
                size="sm"
                rounded={32}
                colorScheme="purple"
                fontWeight="normal"
                variant="ghost"
              />
            ) : (
              <SignInButton
                size="sm"
                rounded={32}
                colorScheme="purple"
                fontWeight="normal"
              />
            )}

            {isMobile && navs.length > 0 && (
              <Button onClick={toggle} variant="ghost" p={0}>
                <CIcon icon={riMenuLine} />
              </Button>
            )}
          </ButtonGroup>
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
