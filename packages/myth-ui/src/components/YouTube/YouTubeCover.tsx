import { Box, Image } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riYoutubeFill } from "../../icons";

export const YouTubeCover = ({ image, ...rest }: any) => {
  return (
    <Box
      pos="relative"
      minH={220}
      backgroundImage="https://i.ytimg.com/vi/M76SUpBf_3o/sddefault.jpg"
      backgroundRepeat="no-repeat"
      backgroundPosition="center center"
      backgroundSize="cover"
      zIndex={100}
      {...rest}
    >
      <Image
        src="https://i.ytimg.com/vi/M76SUpBf_3o/sddefault.jpg"
        visibility="hidden"
        m="0 auto"
        minH={60}
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
  );
};
