import { Container } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const NavBarContainer = ({ children, ...rest }: Props) => {
  return (
    <Container
      maxW="container.md"
      display="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      py={4}
      {...rest}
    >
      {children}
    </Container>
  );
};
