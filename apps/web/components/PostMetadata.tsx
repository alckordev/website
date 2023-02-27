import NextLink from "next/link";
import { UI, CIcon, icon } from "@myth/ui";

interface Props {
  title?: string;
  customDate: string;
  dateTime: string;
  slug?: string;
  readingTime: number;
  tags?: string[];
}

export const PostMetadata = ({
  title,
  customDate,
  dateTime,
  slug,
  readingTime,
}: Props) => {
  return (
    <UI.Box mb={8}>
      <UI.HStack spacing={2}>
        {["Nextjs", "Turbo", "Chakra UI"].map((x) => (
          <UI.Tag key={x} colorScheme="red">
            {x}
          </UI.Tag>
        ))}
      </UI.HStack>
      <UI.Heading as="h1" my={6}>
        {title}
      </UI.Heading>
      <UI.VStack spacing={3} align="left" color="whiteAlpha.500">
        <UI.Flex gap={3} flexWrap="wrap">
          <UI.Flex as="time" dateTime={dateTime} gap={1} align="center">
            <CIcon icon={icon.riCalendarLine} />
            <UI.Text fontSize="sm">{customDate}</UI.Text>
          </UI.Flex>
          <UI.Flex gap={1} align="center">
            <CIcon icon={icon.riDiscussLine} />
            <UI.Text fontSize="sm">2 comentarios</UI.Text>
          </UI.Flex>
          <UI.Flex gap={1} align="center">
            <CIcon icon={icon.riTimeLine} />
            <UI.Text fontSize="sm">
              {Math.round(readingTime)} minutos de lectura
            </UI.Text>
          </UI.Flex>
        </UI.Flex>
      </UI.VStack>
    </UI.Box>
  );
};
