import { useState } from "react";
import { UI, useColorModeValue, CIcon, icon } from "@myth/ui";
import { _dateAgo } from "../../lib/format-date";
import { DisqusForm } from "./DisqusForm";

export const DisqusPost = ({ post, ...rest }: any) => {
  // const [isCollased, setIsCollased] = useState(false);

  // const toggle = () => setIsCollased(!isCollased);

  const [isReplyPost, setIsReplyPost] = useState(false);

  return (
    <UI.VStack
      divider={
        <UI.StackDivider
          borderColor={useColorModeValue("gray.200", "gray.900")}
        />
      }
      w="100%"
      align="flex-end"
      spacing={4}
    >
      <UI.Card minW="100%" size="sm" border={0} boxShadow="none">
        <UI.CardHeader p={0}>
          <UI.Flex gap={4}>
            <UI.Flex flex={1} gap={4} alignItems="center" flexWrap="wrap">
              <UI.Avatar
                name={post.author.name}
                src={post.author.permalink}
                size="sm"
              />
              <UI.Box>
                <UI.Heading size="sm">{post.author.name}</UI.Heading>
                <UI.Text fontSize="xs">{_dateAgo(post.createdAt)}</UI.Text>
              </UI.Box>
            </UI.Flex>
            <UI.IconButton
              variant="ghost"
              colorScheme="red"
              aria-label="Reportar"
              icon={<CIcon icon={icon.riAlarmWarningLine} />}
              size="sm"
              onClick={() => console.log("report it!")}
            />
          </UI.Flex>
        </UI.CardHeader>
        <UI.CardBody px={0}>
          <UI.Box dangerouslySetInnerHTML={{ __html: post.message }} />
        </UI.CardBody>
        <UI.CardFooter p={0}>
          <UI.Stack w="100%" direction="row" justify="space-between">
            <UI.ButtonGroup size="sm" colorScheme="purple" spacing={4}>
              <UI.Button
                leftIcon={<CIcon icon={icon.riLikeLine} />}
                variant="link"
              >
                {post.likes}
              </UI.Button>
              {/* <UI.Button
                leftIcon={<CIcon icon={icon.riDislikeLine} />}
                variant="link"
              >
                {post.dislikes}
              </UI.Button> */}
              <UI.Button
                leftIcon={<CIcon icon={icon.riChatLine} />}
                colorScheme="purple"
                size="sm"
                variant="link"
              >
                2 Respuestas
              </UI.Button>
            </UI.ButtonGroup>
            {post.author.isAnonymous && (
              <UI.Button
                colorScheme="purple"
                size="sm"
                variant="link"
                onClick={() => setIsReplyPost(!isReplyPost)}
              >
                Responder
              </UI.Button>
            )}
          </UI.Stack>
        </UI.CardFooter>
      </UI.Card>

      {isReplyPost && (
        <UI.Box
          style={{
            width: "95%",
            borderLeft: "3px solid rgb(230, 230, 230)",
            paddingLeft: 24,
          }}
        >
          <DisqusForm
            config={rest.config}
            thread={rest.thread}
            parent={post.key}
            onUpdatePosts={rest.onUpdatePosts}
            onCancel={() => setIsReplyPost(!isReplyPost)}
          />
        </UI.Box>
      )}

      {post.children && post.children.length > 0 && (
        // <UI.Collapse in={!isCollased} style={{ width: "95%" }}>
        <UI.VStack>
          {post.children.map((child: any) => (
            <DisqusPost key={child.id} post={child} />
          ))}
        </UI.VStack>
        // </UI.Collapse>
      )}
    </UI.VStack>
  );
};
