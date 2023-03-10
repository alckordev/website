import { Button, ButtonGroup, Avatar, useColorMode } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riMenuLine, riMoonFill, riSunFill } from "../../icons";

interface Props {
  loggedIn?: any;
  signInButton?: any;
  signOutButton?: any;
  isMobile: boolean;
  hasItems: boolean;
  toggle(): void;
}

export const NavBarControl = ({
  loggedIn,
  signInButton: SignInButton,
  signOutButton: SignOutButton,
  isMobile,
  hasItems,
  toggle,
}: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  console.log("nav", loggedIn);

  return (
    <ButtonGroup alignItems="center">
      <Button onClick={toggleColorMode} variant="ghost" p={0}>
        <CIcon icon={colorMode === "dark" ? riMoonFill : riSunFill} />
      </Button>

      {loggedIn ? (
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

      {/* <Avatar size="sm" /> */}

      {isMobile && hasItems && (
        <Button onClick={toggle} variant="ghost" p={0}>
          <CIcon icon={riMenuLine} />
        </Button>
      )}
    </ButtonGroup>
  );
};
