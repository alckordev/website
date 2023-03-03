import { UI, CIcon, icon } from "@myth/ui";
import { _dateAgo } from "../../lib/format-date";

export const DisqusPost = ({ node, ...rest }: any) => {
  return (
    <UI.VStack w="100%" align="flex-end" role="post" {...rest}>
      <UI.Card width="100%" role="content">
        <UI.CardHeader>
          <UI.Flex gap={4}>
            <UI.Flex flex={1} gap={4} alignItems="center" flexWrap="wrap">
              <UI.Avatar name={node.author.name} src={node.author.permalink} />
              <UI.Box>
                <UI.Heading size="sm">{node.author.name}</UI.Heading>
                <UI.Text>{_dateAgo(node.createdAt)}</UI.Text>
              </UI.Box>
            </UI.Flex>
            {/* <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          /> */}
          </UI.Flex>
        </UI.CardHeader>
        <UI.CardBody>
          <UI.Box dangerouslySetInnerHTML={{ __html: node.message }} />
        </UI.CardBody>
        <UI.CardFooter>
          <UI.ButtonGroup size="sm" colorScheme="purple">
            <UI.Button
              leftIcon={<CIcon icon={icon.riLikeLine} size="sm" />}
              variant="ghost"
            >
              {node.likes}
            </UI.Button>
            <UI.Button
              leftIcon={<CIcon icon={icon.riDislikeLine} size="sm" />}
              variant="ghost"
            >
              {node.dislikes}
            </UI.Button>
            <UI.Button variant="ghost">Responder</UI.Button>
            <UI.Button variant="ghost">Compartir</UI.Button>
          </UI.ButtonGroup>
        </UI.CardFooter>
      </UI.Card>
      {node.children.length > 0 && (
        <UI.VStack width="90%" align="flex-end" role="children">
          {node.children.map((child: any) => (
            <DisqusPost key={child.id} node={child} />
          ))}
        </UI.VStack>
      )}
    </UI.VStack>
  );
};
