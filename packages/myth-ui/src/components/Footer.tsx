import styled from "@emotion/styled";
import { Container, Flex, Link } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";

const StyledFooter = styled.footer`
  background-color: var(--chakra-colors-grayblue-900);
  border-top: 1px solid var(--chakra-colors-grayblue-700);
  color: var(--chakra-colors-grayblue-300);
  position: relative;
  overflow: visible;
  z-index: 2;
`;

interface Props {
  networks?: {
    icon: string[];
    url: string;
  }[];
}

export const Footer = ({ networks = [] }: Props) => {
  return (
    <StyledFooter>
      <Container maxW="container.2xl" py={16}>
        {networks.length > 0 && (
          <Flex w="100%" justify="center" align="center" pb={8} gap={3}>
            {networks.map((n, idx) => (
              <Link
                key={idx}
                href={n.url}
                target="_blank"
                display="inline-flex"
                bg="grayblue.500"
                p={2}
                color="brand.500"
                rounded="md"
                _hover={{
                  color: "brand.300",
                  bg: "grayblue.800",
                  textDecoration: "none",
                }}
              >
                <CIcon icon={n.icon} />
              </Link>
            ))}
          </Flex>
        )}

        <Flex
          w="100%"
          direction="column"
          justify="space-between"
          textAlign="center"
          align="center"
          fontFamily="heading"
          fontSize="sm"
        >
          &copy; {new Date().getFullYear()} alckordev | Full Stack Developer
        </Flex>
      </Container>
    </StyledFooter>
  );
};
