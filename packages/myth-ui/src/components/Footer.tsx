import styled from "@emotion/styled";
import { Container, Flex, Link } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";

const StyledFooter = styled.footer`
  border-top: 1px solid var(--chakra-colors-gray-700);
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
      <Container maxW="container.lg" py={16}>
        {networks.length > 0 && (
          <Flex w="100%" justify="center" align="center" pb={8} gap={3}>
            {networks.map((n, idx) => (
              <Link
                key={idx}
                href={n.url}
                target="_blank"
                display="inline-flex"
                bg="gray.900"
                p={2}
                color="gray.500"
                rounded="md"
                _hover={{
                  color: "gray.400",
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
