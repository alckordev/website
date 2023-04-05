import { Flex, Image, Link, useColorMode } from "@chakra-ui/react";

export const Logo = () => {
  const { colorMode } = useColorMode();

  return (
    <Link href="/" _hover={{ textDecor: "none" }}>
      <Flex>
        <Image
          src={
            colorMode === "dark" ? "/assets/logo-dark.png" : "/assets/logo.png"
          }
          height="30px"
          alt="Logo"
        />
      </Flex>
    </Link>
  );
};
