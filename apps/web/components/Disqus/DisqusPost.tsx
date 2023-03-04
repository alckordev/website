import { useState } from "react";
import { UI, CIcon, icon } from "@myth/ui";
import { _dateAgo } from "../../lib/format-date";

export const DisqusPost = ({ post, ...rest }: any) => {
  const [isCollased, setIsCollased] = useState(false);

  const toggle = () => setIsCollased(!isCollased);

  return (
    <UI.VStack
      id={`comment-${post.key}`}
      w="100%"
      align="flex-end"
      data-key={post.key}
      data-parent={post.parent}
      {...rest}
    >
      <UI.Card minW="100%" size="sm">
        <UI.CardHeader>
          <UI.Flex gap={4}>
            <UI.Flex flex={1} gap={4} alignItems="center" flexWrap="wrap">
              <UI.Avatar name={post.author.name} src={post.author.permalink} />
              <UI.Box>
                <UI.Heading size="sm">{post.author.name}</UI.Heading>
                <UI.Text fontSize="xs">{_dateAgo(post.createdAt)}</UI.Text>
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
            <UI.Box dangerouslySetInnerHTML={{ __html: post.message }} />
          </UI.CardBody>
          <UI.CardFooter>
            <UI.ButtonGroup size="sm" colorScheme="purple">
              <UI.Button
                leftIcon={<CIcon icon={icon.riLikeLine} size="sm" />}
                variant="ghost"
              >
                {post.likes}
              </UI.Button>
              <UI.Button
                leftIcon={<CIcon icon={icon.riDislikeLine} size="sm" />}
                variant="ghost"
              >
                {post.dislikes}
              </UI.Button>
              {!post.author.isAnonymous && (
                <UI.Button variant="ghost">Responder</UI.Button>
              )}
              <UI.Button variant="ghost">Compartir</UI.Button>
            </UI.ButtonGroup>
          </UI.CardFooter>
        </UI.Collapse>
      </UI.Card>
      {post.children && post.children.length > 0 && (
        <UI.Collapse in={!isCollased} style={{ width: "95%" }}>
          <UI.VStack>
            {post.children.map((child: any) => (
              <DisqusPost key={child.id} post={child} />
            ))}
          </UI.VStack>
        </UI.Collapse>
      )}
    </UI.VStack>
  );
};
