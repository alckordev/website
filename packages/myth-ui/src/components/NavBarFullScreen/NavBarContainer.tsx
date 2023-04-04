import { Container } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const NavBarContainer = ({ children, ...rest }: Props) => {
  return (
    <Container
      maxW="container"
      minH="72px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      {children}
    </Container>
  );
};
