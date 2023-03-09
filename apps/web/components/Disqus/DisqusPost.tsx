import { useState } from "react";
import { UI, useColorModeValue, CIcon, icon } from "@myth/ui";
import { _dateAgo } from "../../lib/format-date";
import { DisqusForm } from "./DisqusForm";

export const DisqusPost = ({ post, replyConfig, ...rest }: any) => {
  const [isCollased, setIsCollased] = useState(true);

  const [isReplyPost, setIsReplyPost] = useState(false);

  return (
    <UI.VStack w="100%" spacing={6} {...rest}>
      <UI.Card w="100%" size="sm" border={0} boxShadow="none">
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
              {post.children && post.children.length > 0 && (
                <UI.Button
                  leftIcon={<CIcon icon={icon.riChatLine} />}
                  colorScheme="purple"
                  size="sm"
                  variant="link"
                  onClick={() => setIsCollased(!isCollased)}
                >
                  {isCollased
                    ? `${post.children.length} Respuestas`
                    : `Ocultar respuestas`}
                </UI.Button>
              )}
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
            width: "calc(100% - 1rem)",
            borderLeft: "3px solid rgb(230, 230, 230)",
            paddingLeft: 24,
          }}
        >
          <DisqusForm
            placeholder={`Respondiendo a ${post.author.name}...`}
            config={replyConfig.config}
            thread={replyConfig.thread}
            parent={post.key}
            onUpdatePosts={replyConfig.onUpdatePosts}
            onCancel={() => setIsReplyPost(!isReplyPost)}
          />
        </UI.Box>
      )}

      {post.children && post.children.length > 0 && (
        <UI.Collapse
          in={!isCollased}
          style={{
            width: "calc(100% - 1rem)",
            marginLeft: "auto",
          }}
        >
          <UI.VStack
            divider={
              <UI.StackDivider
                borderColor={useColorModeValue("gray.200", "gray.900")}
              />
            }
            w="100%"
            spacing={4}
            style={{
              borderLeft: "3px solid rgb(230, 230, 230)",
              paddingLeft: 24,
            }}
          >
            {post.children.map((child: any) => (
              <DisqusPost
                key={`child-${child.key}`}
                post={child}
                replyConfig={replyConfig}
              />
            ))}
          </UI.VStack>
        </UI.Collapse>
      )}
    </UI.VStack>
  );
};
