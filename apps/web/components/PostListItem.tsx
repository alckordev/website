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
  customDate,
  dateTime,
  slug,
  tags = [],
  ...rest
}: any) => {
  const [lineClamp, setLineClamp] = useState<number>(2);

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const lineClampDynamic = () => {
      const currentRef = headingRef.current;
      const currentHeight = currentRef?.getBoundingClientRect().height;
      if (currentHeight) {
        if (currentHeight < 60) {
          setLineClamp(3);
        } else {
          setLineClamp(2);
        }
      }
    };

    window.addEventListener("resize", lineClampDynamic);

    return () => {
      window.removeEventListener("resize", lineClampDynamic);
    };
  }, []);

  return (
    <UI.Box
      as={motion.div}
      initial="normal"
      whileHover="hover"
      w="100%"
      maxW={[null, null, 680, 680]}
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
                lineHeight={["20px", "20px", "28px", "28px"]}
                size={["sm", "sm", "md", "md"]}
                maxH={["40px", "40px", "60px", "60px"]}
                pb={[null, null, 2, 2]}
                sx={{
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
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
                    WebkitLineClamp: lineClamp,
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
                src="https://miro.medium.com/v2/resize:fit:720/0*pZbq2mTk_09JYVI9"
                alt="Caffe Latte"
                w={["100px", "100px", "160px", "160px"]}
                h={["70px", "70px", "112px", "112px"]}
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
              colorScheme="purple"
              size={["sm", "sm", "md", "md"]}
            >
              {tag.name}
            </UI.Tag>
          ))}
        </UI.HStack>
      </UI.Stack>
    </UI.Box>
  );
};
