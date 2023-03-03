import { useState } from "react";
import { UI, CIcon, icon } from "@myth/ui";
import { _dateAgo } from "../../lib/format-date";

export const DisqusPost = ({ node, ...rest }: any) => {
  const [isCollased, setIsCollased] = useState(false);

  const toggle = () => setIsCollased(!isCollased);

  return (
    <UI.VStack
      w="100%"
      align="flex-end"
      data-disqus-id={node.id}
      data-disqus-parent={node.parent}
      {...rest}
    >
      <UI.Card minW="100%">
        <UI.CardHeader>
          <UI.Flex gap={4}>
            <UI.Flex flex={1} gap={4} alignItems="center" flexWrap="wrap">
              <UI.Avatar name={node.author.name} src={node.author.permalink} />
              <UI.Box>
                <UI.Heading size="sm">{node.author.name}</UI.Heading>
                <UI.Text>{_dateAgo(node.createdAt)}</UI.Text>
              </UI.Box>
            </UI.Flex>
            <UI.IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={
                <CIcon
                  icon={!isCollased ? icon.riMinusFill : icon.riPlusFill}
                />
              }
              onClick={toggle}
            />
          </UI.Flex>
        </UI.CardHeader>
        <UI.Collapse in={!isCollased}>
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
        </UI.Collapse>
      </UI.Card>
      {node.children.length > 0 && (
        <UI.Collapse in={!isCollased} style={{ width: "90%" }}>
          <UI.VStack>
            {node.children.map((child: any) => (
              <DisqusPost key={child.id} node={child} />
            ))}
          </UI.VStack>
        </UI.Collapse>
      )}
    </UI.VStack>
  );
};
