import NextLink from "next/link";
import { UI } from "@myth/ui";

interface Props {
  title: string;
  summary: string;
  customDate: string;
  dateTime: string;
  slug: string;
  tags?: string[];
}

export const PostListItem = ({
  title,
  summary,
  customDate,
  dateTime,
  slug,
  ...rest
}: Props) => {
  return (
    <UI.Card as={NextLink} w="100%" href={`${slug}`} {...rest}>
      <UI.Stack>
        <UI.CardBody>
          <UI.Text as="time" fontSize="xs" dateTime={dateTime}>
            {customDate}
          </UI.Text>
          <UI.Heading size="md" mt={2} mb={4}>
            {title}
          </UI.Heading>
          <UI.Text>{summary}</UI.Text>
        </UI.CardBody>
        <UI.CardFooter>
          <UI.HStack spacing={2}>
            {["Nextjs", "Turbo", "Chakra UI"].map((x) => (
              <UI.Tag key={x} colorScheme="red">
                {x}
              </UI.Tag>
            ))}
          </UI.HStack>
        </UI.CardFooter>
      </UI.Stack>
    </UI.Card>
  );
};