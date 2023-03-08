import NextLink from "next/link";
import { UI } from "@myth/ui";

interface Props {
  title: string;
  summary: string;
  customDate: string;
  dateTime: string;
  slug: string;
  tags?: {
    name: string;
    slug: string;
  }[];
}

export const PostListItem = ({
  title,
  summary,
  customDate,
  dateTime,
  slug,
  tags = [],
  ...rest
}: Props) => {
  return (
    <UI.Card
      w="100%"
      maxW={[null, null, 680, 680]}
      bg="transparent"
      boxShadow="none"
      {...rest}
    >
      <UI.Stack>
        <UI.CardBody as={NextLink} href={`/${slug}`} px={0} pt={0}>
          <UI.Text as="time" fontSize="xs" dateTime={dateTime}>
            {customDate}
          </UI.Text>
          <UI.Flex align="center">
            <UI.Box flex="1 1 auto">
              <UI.Heading
                lineHeight={["20px", "20px", "28px", "28px"]}
                size={["sm", "sm", "md", "md"]}
                textOverflow="ellipsis"
                overflow="hidden"
                maxH={["40px", "40px", "84px", "84px"]}
                pb={[null, null, 2, 2]}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {title}
              </UI.Heading>
              <UI.Box display={["none", "none", "block", "block"]}>
                <UI.Text
                  textOverflow="ellipsis"
                  overflow="hidden"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {summary}
                </UI.Text>
              </UI.Box>
            </UI.Box>
            <UI.Box
              ml={[6, 6, "60px", "60px"]}
              minW={["80px", "80px", "112px", "112px"]}
            >
              <UI.Image
                src="https://miro.medium.com/v2/resize:fit:720/0*pZbq2mTk_09JYVI9"
                alt="Caffe Latte"
                w={["80px", "80px", "112px", "112px"]}
                h={["56px", "56px", "112px", "112px"]}
                objectFit="cover"
              />
            </UI.Box>
          </UI.Flex>
        </UI.CardBody>
        <UI.CardFooter p={0}>
          <UI.HStack spacing={2}>
            {tags.map((tag, idx) => (
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
        </UI.CardFooter>
      </UI.Stack>
    </UI.Card>
  );
};
