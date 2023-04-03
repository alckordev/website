import { Link, Heading, Image } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Heading size="md">
      <Link
        href="/"
        display="flex"
        alignItems="center"
        gap={2}
        _hover={{
          textDecor: "none",
        }}
      >
        <Image src="/assets/iso.png" width="auto" height="30" />
        alckor
      </Link>
    </Heading>
  );
};
