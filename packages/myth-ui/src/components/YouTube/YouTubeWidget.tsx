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
      href="https://www.youtube.com/watch?v=M76SUpBf_3o"
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
            Cómo crear una aplicación web como Instagram | Curso Gratis ReactJS
            y Firebase #01
          </Text>
        </YouTubeHeading>
      </Box>
    </Link>
  );
};
