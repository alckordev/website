import { Flex, Image, Link } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Link href="/" _hover={{ textDecor: "none" }}>
      <Flex>
        <Image src="/assets/iso.png" width="30px" height="30px" alt="Logo" />
      </Flex>
    </Link>
  );
};
