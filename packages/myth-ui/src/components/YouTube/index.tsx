import { Box, Flex, Image, Heading, Text, HStack } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riYoutubeFill } from "../../icons";

export const YouTube = () => {
  return (
    <Box pos="relative" overflow="hidden">
      <Box
        pos="relative"
        minH={220}
        backgroundImage="https://i.ytimg.com/vi/m-KkPaN-6XA/sddefault.jpg"
        backgroundRepeat="no-repeat"
        backgroundPosition="center center"
        backgroundSize="cover"
        zIndex={1}
      >
        <Image
          src="https://i.ytimg.com/vi/m-KkPaN-6XA/hqdefault.jpg"
          visibility="hidden"
          m="0 auto"
          minH={40}
        />
        <Box
          as={CIcon}
          icon={riYoutubeFill}
          pos="absolute"
          w="3rem !important"
          h="3rem !important"
          color="red"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
      <Box
        pos="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        py={3}
        px={4}
        zIndex={1}
      >
        <Box
          bg="black"
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.7}
          zIndex={-1}
        />
        <Heading
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="md"
          fontWeight="semibold"
          wordBreak="break-word"
          lineHeight="140%"
          mb={3}
          w="90%"
          maxH="calc(100% - 100px)"
          pb={5}
          sx={{
            mask: "linear-gradient(to bottom, #000 calc(100% - 2.5em), transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 calc(100% - 2.5em), transparent)",
          }}
        >
          ASMR Tu chica te susurra lo que necesitas oír [Roleplay] | ASMR
          ESPAÑOL | Ceceinfinite
        </Heading>
        <HStack
          align="center"
          justify="space-between"
          pos="absolute"
          bottom={3}
          w="90%"
          minH="30px"
        >
          <Text
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            maxW="88%"
            fontSize="sm"
          >
            Ceceinfinite ASMR
          </Text>
          <Text
            as="time"
            dateTime=""
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            maxW="40%"
            fontSize="sm"
          >
            hace 8 días
          </Text>
        </HStack>
      </Box>
      <Box
        as={CIcon}
        icon={riYoutubeFill}
        pos="absolute"
        right={3}
        bottom="18px"
        zIndex={3}
      />
    </Box>
  );
};
