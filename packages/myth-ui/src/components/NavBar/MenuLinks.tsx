import { Box, Stack, Button } from "@chakra-ui/react";
import { MenuItem } from "./MenuItem";

interface Props {
  isOpen: boolean;
}

export const MenuLinks = ({ isOpen }: Props) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/how">How It works </MenuItem>
        <MenuItem to="/faetures">Features </MenuItem>
        <MenuItem to="/pricing">Pricing </MenuItem>
        <MenuItem to="/signup" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["brand.500", "brand.500", "white", "white"]}
            bg={["white", "white", "brand.500", "brand.500"]}
            _hover={{
              bg: ["brand.100", "brand.100", "brand.600", "brand.600"],
            }}
          >
            Create Account
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};
