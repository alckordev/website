import { useState } from "react";
import { UI, useColorModeValue, CIcon, icon } from "@myth/ui";
import { _dateAgo } from "../../lib/format-date";
import { DisqusForm } from "./DisqusForm";
import { DisqusPostLikes } from "./DisqusPostLikes";

export const DisqusPost = ({
  user: currentUser,
  onOpenSignIn,
  thread,
  post,
  ...rest
}: any) => {
  const [isReplyListCollased, setIsReplyListCollased] = useState(false);
  const [isReplyFormCollased, setIsReplyFormCollased] = useState(false);

  const replyListToggle = () => setIsReplyListCollased(!isReplyListCollased);
  const replyFormToggle = () => setIsReplyFormCollased(!isReplyFormCollased);

  return (
    <UI.VStack w="100%" spacing={8} {...rest}>
      <UI.Card w="100%" size="sm" border={0} boxShadow="none">
        <UI.CardHeader p={0}>
          <UI.Flex gap={4}>
            <UI.Flex flex={1} gap={4} alignItems="center" flexWrap="wrap">
              <UI.Avatar
                name={post.author.name}
                src={post.author.picture}
                size="sm"
              />
              <UI.Box lineHeight={1.25}>
                <UI.Flex as={UI.Text} align="center" gap={1}>
                  {post.author.name}
                  {!post.author.isAnonymous && (
                    <UI.Tooltip
                      hasArrow
                      label="Correo verificado"
                      placement="top"
                    >
                      <UI.Box
                        as={CIcon}
                        icon={icon.riCheckCircleFill}
                        color="blue.500"
                      />
                    </UI.Tooltip>
                  )}
                </UI.Flex>
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
            <UI.ButtonGroup spacing={4}>
              <DisqusPostLikes identifier={post.key} />
              {post.children && post.children.length > 0 && (
                <UI.Button
                  leftIcon={<CIcon icon={icon.riChatLine} />}
                  colorScheme="purple"
                  size="sm"
                  variant="link"
                  onClick={replyListToggle}
                >
                  {!isReplyListCollased
                    ? `${post.children.length} Respuestas`
                    : `Ocultar respuestas`}
                </UI.Button>
              )}
            </UI.ButtonGroup>
            {currentUser && (
              <UI.Button
                colorScheme="purple"
                size="sm"
                variant="link"
                onClick={replyFormToggle}
              >
                Responder
              </UI.Button>
            )}
          </UI.Stack>
        </UI.CardFooter>
      </UI.Card>

      <UI.Collapse in={isReplyFormCollased} style={{ width: "100%" }}>
        <UI.Box
          borderLeftWidth={3}
          borderLeftStyle="solid"
          borderLeftColor={useColorModeValue("gray.200", "gray.900")}
          style={{
            width: "calc(100% - 1rem)",
            marginLeft: "auto",
            paddingLeft: 24,
          }}
        >
          <DisqusForm
            placeholder={`Respondiendo a ${post.author.name}...`}
            user={currentUser}
            thread={thread}
            parent={post.key}
            onCancel={replyFormToggle}
            onOpenSignIn={onOpenSignIn}
          />
        </UI.Box>
      </UI.Collapse>

      <UI.Collapse in={isReplyListCollased} style={{ width: "100%" }}>
        <UI.Box
          borderLeftWidth={3}
          borderLeftStyle="solid"
          borderLeftColor={useColorModeValue("gray.200", "gray.900")}
          style={{
            width: "calc(100% - 1rem)",
            marginLeft: "auto",
            paddingLeft: 24,
          }}
        >
          <UI.VStack
            divider={
              <UI.StackDivider
                borderColor={useColorModeValue("gray.200", "gray.900")}
              />
            }
            w="100%"
            spacing={6}
          >
            {post.children.map((child: any) => (
              <DisqusPost
                key={`child-${child.key}`}
                user={currentUser}
                post={child}
                thread={thread}
              />
            ))}
          </UI.VStack>
        </UI.Box>
      </UI.Collapse>
    </UI.VStack>
  );
};
