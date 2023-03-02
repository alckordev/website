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
    <UI.Card w="100%" variant="outline" {...rest}>
      <UI.Stack>
        <UI.CardBody>
          <UI.Text as="time" fontSize="xs" dateTime={dateTime}>
            {customDate}
          </UI.Text>
          <UI.Heading size="md" mt={2} mb={4}>
            <UI.Link as={NextLink} href={`/${slug}`}>
              {title}
            </UI.Link>
          </UI.Heading>
          <UI.Text>{summary}</UI.Text>
        </UI.CardBody>
        <UI.CardFooter>
          <UI.HStack spacing={2}>
            {tags.map((tag, idx) => (
              <UI.Tag
                key={idx}
                as={NextLink}
                href={`tag/${tag.slug}`}
                colorScheme="purple"
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
