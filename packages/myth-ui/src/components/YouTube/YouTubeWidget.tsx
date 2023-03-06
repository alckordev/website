import { useState } from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import { YouTubeCover } from "./YouTubeCover";
import { YouTubeOverlay } from "./YouTubeOverlay";
import { YouTubeHeading } from "./YouTubeHeading";

export const YouTubeWidget = ({ video, ...rest }: any) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      display="block"
      pos="relative"
      overflow="hidden"
      href="https://www.youtube.com/watch?v=_WWZkN1VIDc"
      isExternal
      {...rest}
    >
      <YouTubeCover image={""} />
      <Box
        pos="absolute"
        padding={4}
        zIndex={100}
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <YouTubeOverlay />
        <YouTubeHeading>
          <Text fontSize={["md", "lg"]} fontWeight="semibold">
            ASMR Tu novia cuida de ti ❤️ Roleplay | ASMR ESPAÑOL | Ceceinfinite
          </Text>
        </YouTubeHeading>
      </Box>
    </Link>
  );
};
