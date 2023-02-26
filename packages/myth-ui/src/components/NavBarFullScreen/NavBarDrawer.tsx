import styled from "@emotion/styled";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";

const StyledDrawerContent = styled(DrawerContent)`
  --drawer-bg: var(--chakra-colors-gray-900);
  background-color: var(--drawer-bg);
  background-image: url(/assets/audio-bar.svg);
  background-position: center bottom;
  background-size: 120px;
  background-repeat: space no-repeat;
  box-shadow: var(--drawer-box-shadow);
  border-top-left-radius: var(--chakra-radii-2xl);
  border-top-right-radius: var(--chakra-radii-2xl);
  font-family: var(--chakra-fonts-heading);
  min-height: calc(
    50vh - env(safe-area-inset-top) - env(safe-area-inset-bottom)
  );
`;

const StyledDrawerBody = styled(DrawerBody)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-start: var(--chakra-space-6);
  padding-inline-end: var(--chakra-space-6);
  padding-top: max(var(--chakra-space-4), env(safe-area-inset-top));
  padding-bottom: max(var(--chakra-space-4), env(safe-area-inset-bottom));
`;

interface Props {
  children: React.ReactNode;
  isMobile: boolean;
  isOpen: boolean;
  toggle(): void;
}

export const NavBarDrawer = ({ children, isMobile, isOpen, toggle }: Props) => {
  if (!isMobile && !isOpen) return null;

  return (
    <Drawer
      placement="bottom"
      isOpen={isOpen}
      onClose={toggle}
      closeOnOverlayClick={true}
    >
      <DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
      <StyledDrawerContent>
        <DrawerCloseButton
          minW={10}
          height={10}
          _focusVisible={{ boxShadow: "none" }}
        />
        <StyledDrawerBody>{children}</StyledDrawerBody>
      </StyledDrawerContent>
    </Drawer>
  );
};
