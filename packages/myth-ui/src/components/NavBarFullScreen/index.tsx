import styled from "@emotion/styled";
import {
  Box,
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
import { icons } from "../../icons";

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
  searchBox?: any;
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
  searchBox: SearchBox,
  navs,
  ...rest
}: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 46em)");

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <StyledNavbar
      isScrolled={isScrolled}
      borderColor={useColorModeValue(
        "var(--chakra-colors-gray-200)",
        "var(--chakra-colors-gray-958)"
      )}
    >
      <NavBarContainer {...rest}>
        <Logo />
        <Flex w="100%" align="center" justify="space-between">
          {SearchBox && !isMobile && <SearchBox />}

          <Box ml="auto">
            <ButtonGroup alignItems="center">
              <Button
                size="sm"
                onClick={toggleColorMode}
                variant="ghost"
                p={0}
                display={["none", "inline-flex"]}
              >
                <CIcon
                  icon={
                    colorMode === "dark" ? icons.riMoonFill : icons.riSunFill
                  }
                />
              </Button>

              {user ? (
                <SignOutButton
                  size="sm"
                  rounded="3xl"
                  colorScheme="purple"
                  variant="ghost"
                />
              ) : (
                <SignInButton size="sm" rounded="3xl" colorScheme="purple" />
              )}
            </ButtonGroup>
          </Box>
        </Flex>
      </NavBarContainer>
    </StyledNavbar>
  );
};
