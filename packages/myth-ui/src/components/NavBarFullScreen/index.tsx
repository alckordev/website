import styled from "@emotion/styled";
import {
  Portal,
  Container,
  Link,
  Heading,
  Flex,
  Box,
  Text,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riMoonFill, riMenuLine } from "../../icons";

const StyledNavbar = styled.header`
  background-color: transparent;
  backdrop-filter: saturate(100%) blur(0px);
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 50ms;
  z-index: var(--chakra-zIndices-overlay);
`;

export const NavBarFullScreen = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <StyledNavbar>
      <Container
        maxW="container.md"
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
      >
        <Link href="/">
          <Heading size="md">alckordev</Heading>
        </Link>
        <Flex gap={8}>
          {!isMobile && (
            <Stack
              as="nav"
              spacing={10}
              align="center"
              justify="center"
              direction="row"
              color="gray.500"
              fontWeight="bold"
            >
              <Link href="/" display="block">
                <Text color="white" lineHeight="1.6" fontSize="16px" py={3}>
                  Inicio
                </Text>
              </Link>
              <Link href="/" display="block">
                <Text color="white" lineHeight="1.6" fontSize="16px" py={3}>
                  Artículos
                </Text>
              </Link>
            </Stack>
          )}
          <Flex align="center">
            <Box
              display="inline-flex"
              cursor="pointer"
              appearance="none"
              alignItems="center"
              justifyContent="center"
              userSelect="none"
              position="relative"
              whiteSpace="nowrap"
              verticalAlign="middle"
              borderRadius="md"
              fontWeight="semibold"
              height={10}
              minW={10}
              bg="transparent"
              color="gray.100"
              onClick={() => console.log("theme")}
              // _hover={{ color: "red" }}
            >
              <CIcon icon={riMoonFill} size="lg" />
            </Box>
            {isMobile && (
              <Box
                display="inline-flex"
                cursor="pointer"
                appearance="none"
                alignItems="center"
                justifyContent="center"
                userSelect="none"
                position="relative"
                whiteSpace="nowrap"
                verticalAlign="middle"
                borderRadius="md"
                fontWeight="semibold"
                height={10}
                minW={10}
                bg="transparent"
                color="gray.100"
                onClick={() => console.log("menu")}
              >
                <CIcon icon={riMenuLine} size="lg" />
              </Box>
            )}
          </Flex>
        </Flex>
      </Container>

      {isMobile && <Portal>Soy Mobile</Portal>}
    </StyledNavbar>
  );
};
