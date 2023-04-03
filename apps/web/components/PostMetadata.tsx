import NextLink from "next/link";
import { UI, CIcon, icon, useColorModeValue } from "@myth/ui";

export const PostMetadata = ({
  title,
  coverImage,
  customDate,
  dateTime,
  readingTime,
  tags = [],
}: any) => {
  return (
    <UI.Box pb={4} mb={7}>
      <UI.HStack spacing={2}>
        {tags.map((tag: any, idx: number) => (
          <UI.Tag
            key={idx}
            as={NextLink}
            href={`tag/${tag.slug}`}
            colorScheme={tag.colorScheme}
            rounded="3xl"
          >
            {tag.name}
          </UI.Tag>
        ))}
      </UI.HStack>
      <UI.Heading as="h1" my={6} size={["lg", "lg", "xl", "xl"]}>
        {title}
      </UI.Heading>
      <UI.VStack spacing={3} align="left">
        <UI.Flex
          gap={3}
          flexWrap="wrap"
          color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
        >
          <UI.Flex as="time" dateTime={dateTime} gap={1} align="center">
            <CIcon icon={icon.riCalendarLine} />
            <UI.Text fontSize="sm">{customDate}</UI.Text>
          </UI.Flex>
          <UI.Flex gap={1} align="center">
            <CIcon icon={icon.riTimeLine} />
            <UI.Text fontSize="sm">
              {Math.round(readingTime)} minutos de lectura
            </UI.Text>
          </UI.Flex>
        </UI.Flex>
      </UI.VStack>

      <UI.Divider
        borderColor={useColorModeValue("gray.200", "gray.958")}
        opacity={1}
        my={7}
      />

      <UI.Image src={coverImage} alt={title} objectFit="cover" mx="auto" />
    </UI.Box>
  );
};
