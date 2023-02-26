import NextLink from "next/link";
import { UI } from "@myth/ui";

interface Props {
  title: string;
  summary: string;
  date: string;
  slug: string;
}

export const PostListItem = ({
  title,
  summary,
  date,
  slug,
  ...rest
}: Props) => {
  return (
    <UI.Card as={NextLink} w="100%" href={`${slug}`} {...rest}>
      <UI.Stack>
        <UI.CardBody>
          <UI.Text as="time" fontSize="xs" dateTime="2023-01-05">
            5 enero, 2023
          </UI.Text>
          <UI.Heading size="md" mt={2} mb={4}>
            The perfect latte
          </UI.Heading>
          <UI.Text>
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </UI.Text>
        </UI.CardBody>
        <UI.CardFooter>
          <UI.HStack spacing={1}>
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
