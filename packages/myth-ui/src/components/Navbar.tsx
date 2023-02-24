import styled from "@emotion/styled";
import { Container, Flex } from "../chakra-ui";

const StyledNavbar = styled.footer`
  background-color: var(--chakra-colors-secondary-900);
  color: var(--chakra-colors-white);
  position: relative;
  overflow: visible;
  z-index: 2;
`;

export const Navbar = () => {
  return (
    <StyledNavbar>
      <Container maxW="container.2xl">asafs</Container>
    </StyledNavbar>
  );
};
