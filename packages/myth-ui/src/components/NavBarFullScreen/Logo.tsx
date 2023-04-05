import { Flex, Image, Link, useColorMode } from "@chakra-ui/react";

export const Logo = () => {
  const { colorMode } = useColorMode();

  return (
    <Link href="/" _hover={{ textDecor: "none" }} flex="0 0 113px" maxW="113px">
      <Flex>
        <Image
          src={
            colorMode === "dark" ? "/assets/logo-dark.png" : "/assets/logo.png"
          }
          width="113px"
          height="30px"
          alt="Logo"
        />
      </Flex>
    </Link>
  );
};
