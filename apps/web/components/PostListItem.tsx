import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { UI, useColorModeValue, motion, Variants } from "@myth/ui";

const variants: Variants = {
  normal: {
    position: "relative",
    display: "inline",
    backgroundImage: "linear-gradient(90deg,currentColor 0,currentColor)",
    backgroundSize: "0 2px",
    backgroundPosition: "0 95%",
    backgroundRepeat: "no-repeat",
  },
  hover: {
    backgroundSize: "100% 2px",
  },
};

export const PostListItem = ({
  title,
  summary,
  coverImage,
  customDate,
  dateTime,
  slug,
  tags = [],
  ...rest
}: any) => {
  const [maxLineClamp, setMaxLineClamp] = useState<number>(2);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const checkLineClamp = () => {
    if (headingRef && headingRef.current) {
      const lineHeight = parseInt(
        window
          .getComputedStyle(headingRef.current)
          .getPropertyValue("line-height"),
        10
      );
      const currentHeight = headingRef.current.offsetHeight;
      const lines = currentHeight / lineHeight;

      if (lines < 2) {
        setMaxLineClamp(3);
      } else {
        setMaxLineClamp(2);
      }
    }
  };

  useEffect(() => {
    checkLineClamp();

    window.addEventListener("resize", checkLineClamp);

    return () => {
      window.removeEventListener("resize", checkLineClamp);
    };
  }, [headingRef]);

  return (
    <UI.Box
      as={motion.div}
      initial="normal"
      whileHover="hover"
      w="100%"
      // maxW={[null, null, 680, 680]}
      {...rest}
    >
      <UI.Stack spacing={6}>
        <UI.Box as={NextLink} href={`/${slug}`}>
          <UI.Flex mb={2} fontSize="xs">
            <UI.Text as="time" dateTime={dateTime}>
              {customDate}
            </UI.Text>
          </UI.Flex>
          <UI.Flex align={[null, null, "center", "center"]}>
            <UI.Box flex="1 1 auto">
              <UI.Heading
                size={["sm", "sm", "md", "md"]}
                lineHeight={[
                  "20px !important",
                  "20px !important",
                  "28px !important",
                  "28px !important",
                ]}
                maxH="60px"
                pb={[null, null, 2, 2]}
                sx={{
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  WebkitLineClamp: [3, 3, 2, 2],
                  WebkitBoxOrient: "vertical",
                }}
                ref={headingRef}
              >
                <motion.span variants={variants}>{title}</motion.span>
              </UI.Heading>
              <UI.Box display={["none", "none", "block", "block"]}>
                <UI.Text
                  color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
                  sx={{
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitLineClamp: maxLineClamp,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {summary}
                </UI.Text>
              </UI.Box>
            </UI.Box>
            <UI.Box
              ml={[6, 6, "50px", "50px"]}
              minW={["100px", "100px", "160px", "160px"]}
              overflow="hidden"
            >
              <UI.Image
                as={motion.img}
                variants={{
                  normal: {
                    scale: 1,
                  },
                  hover: {
                    scale: 1.25,
                  },
                }}
                src={coverImage}
                alt={title}
                w={["100px", "100px", "160px", "160px"]}
                h={["60px", "60px", "108px", "108px"]}
                objectFit="cover"
              />
            </UI.Box>
          </UI.Flex>
        </UI.Box>
        <UI.HStack spacing={2}>
          {tags.map((tag: any, idx: number) => (
            <UI.Tag
              key={idx}
              as={NextLink}
              href={`tag/${tag.slug}`}
              colorScheme={tag.colorScheme}
              size={["sm", "sm", "md", "md"]}
              rounded="3xl"
            >
              {tag.name}
            </UI.Tag>
          ))}
        </UI.HStack>
      </UI.Stack>
    </UI.Box>
  );
};
