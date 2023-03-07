import { Container } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const NavBarContainer = ({ children, ...rest }: Props) => {
  return (
    <Container
      maxW="container"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={4}
      {...rest}
    >
      {children}
    </Container>
  );
};
