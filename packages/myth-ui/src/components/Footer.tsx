import {
  Container,
  Box,
  Flex,
  Link,
  ButtonGroup,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";

interface Props {
  networks?: {
    name: string;
    icon: string[];
    url: string;
  }[];
}

export const Footer = ({ networks = [], ...rest }: Props) => {
  return (
    <Box as="footer" bg={useColorModeValue("gray.100", "gray.900")}>
      <Container maxW="container.xl" py={16}>
        {networks.length > 0 && (
          <ButtonGroup display="flex" justifyContent="center" pb={10}>
            {networks.map((n, idx) => (
              <IconButton
                key={idx}
                as={Link}
                colorScheme="purple"
                aria-label={n.name}
                icon={<CIcon icon={n.icon} />}
                variant="outline"
                href={n.url}
                isExternal
              />
            ))}
          </ButtonGroup>
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
          © {new Date().getFullYear()} - Francisco Luis
        </Flex>
      </Container>
    </Box>
  );
};
