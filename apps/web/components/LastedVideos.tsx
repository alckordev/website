import { useEffect, useState } from "react";
import { UI, CIcon, icon, motion } from "@myth/ui";
import { ref, get } from "firebase/database";
import { database } from "../lib/firebase";
import { getWithKey } from "../lib/firebase-utils";
import { _date } from "../lib/format-date";

const variants = {
  normal: {
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    backgroundColor: "black",
    scale: 0.95,
    transition: {
      scale: { stiffness: 1000 },
    },
  },
  hover: {
    backgroundColor: "red",
    scale: 1,
  },
};

export const LastedVideos = ({ ...rest }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const videosRef = ref(database, "videos");

      const snapshot = await get(videosRef);

      if (snapshot.exists()) {
        setVideos(getWithKey(snapshot.val()));
      }
    }

    getVideos();
  }, []);

  return (
    <UI.Box {...rest}>
      {videos.length > 0 ? (
        <UI.VStack spacing={4}>
          {videos.map((v: any) => (
            <UI.Link
              as={motion.a}
              initial="normal"
              whileHover="hover"
              key={v.key}
              href={`https://www.youtube.com/watch?v=${v.resourceId.videoId}`}
              display="flex"
              isExternal
              _hover={{ textDecor: "none" }}
            >
              <UI.Box minW={100} mr={4} position="relative">
                <UI.Image
                  src={v.thumbnails.medium.url}
                  alt="Caffe Latte"
                  w={100}
                  h={70}
                  objectFit="cover"
                />
                <UI.Flex
                  as={motion.div}
                  variants={variants}
                  position="absolute"
                  p="3px 7px 3px 7px"
                  rounded="2xl"
                >
                  <UI.Box as={CIcon} icon={icon.riPlayFill} color="white" />
                </UI.Flex>
              </UI.Box>
              <UI.Box>
                <UI.Text as="time" fontSize="xs" dateTime={v.publishedAt}>
                  {_date(v.publishedAt)}
                </UI.Text>
                <UI.Heading
                  as="h3"
                  fontSize="sm"
                  fontWeight="semibold"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {v.title}
                </UI.Heading>
              </UI.Box>
            </UI.Link>
          ))}
        </UI.VStack>
      ) : (
        <UI.Text>No hay videos disponibles en este momento.</UI.Text>
      )}
    </UI.Box>
  );
};
