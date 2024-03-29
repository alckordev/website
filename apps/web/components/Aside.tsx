import { Fragment } from "react";
import NextLink from "next/link";
import { UI, useColorModeValue } from "@myth/ui";
import tags from "../data/tags";
import { Newsletter } from "./Newsletter";
// import { LastedVideos } from "./LastedVideos";

export const Aside = () => {
  const borderColor = useColorModeValue("gray.200", "gray.958");

  return (
    <Fragment>
      <UI.VStack
        divider={<UI.StackDivider borderColor={borderColor} />}
        spacing={7}
      >
        <UI.Card minW="100%" bg="transparent" boxShadow="none">
          <UI.CardHeader p={0}>
            <UI.Flex gap={4} alignItems="center" flexWrap="wrap">
              <UI.Avatar
                name="Francisco Luis Rios Vega"
                src="/assets/avatar.jpg"
              />
              <UI.Box>
                <UI.Heading size="sm">Francisco Luis</UI.Heading>
                <UI.Text fontSize="sm" opacity={0.5}>
                  Senior Developer
                </UI.Text>
              </UI.Box>
            </UI.Flex>
          </UI.CardHeader>
          <UI.CardBody px={0} pb={0}>
            <UI.Text>
              Ingeniero de sistemas de profesión, especializado en el desarrollo
              de proyectos de software con más de 10 años de experiencia.
            </UI.Text>
          </UI.CardBody>
        </UI.Card>
        {/* <UI.Card minW="100%" bg="transparent" boxShadow="none">
          <UI.CardHeader p={0}>
            <UI.Heading as="h2" fontSize="lg">
              Últimos videos
            </UI.Heading>
          </UI.CardHeader>
          <UI.CardBody px={0} pb={0}>
            <LastedVideos />
          </UI.CardBody>
        </UI.Card> */}
      </UI.VStack>
      <UI.Divider borderColor={borderColor} opacity={1} my={7} />
      <UI.VStack
        divider={<UI.StackDivider borderColor={borderColor} />}
        spacing={7}
        pos="sticky"
        top="122px"
      >
        <UI.Card minW="100%" bg="transparent" boxShadow="none">
          <UI.CardHeader p={0}>
            <UI.Heading as="h2" fontSize="lg">
              Temas
            </UI.Heading>
          </UI.CardHeader>
          <UI.CardBody px={0} pb={0}>
            <UI.Flex flexWrap="wrap" gap={2}>
              {tags.map((tag, idx) => (
                <UI.Tag
                  key={idx}
                  as={NextLink}
                  href={`/tag/${tag.slug}`}
                  colorScheme={tag.colorScheme}
                  size="lg"
                  rounded="3xl"
                >
                  {tag.name}
                </UI.Tag>
              ))}
            </UI.Flex>
          </UI.CardBody>
        </UI.Card>
        <UI.Card minW="100%" bg="transparent" boxShadow="none">
          <UI.CardHeader p={0}>
            <UI.Heading as="h2" fontSize="lg">
              ¡Suscríbete ahora!
            </UI.Heading>
          </UI.CardHeader>
          <UI.CardBody px={0} pb={0}>
            <UI.Text mb={6}>
              Recibirás artículos sobre programación y novedades en las que vaya
              trabajando. ¡Libre de Spam!
            </UI.Text>
            <Newsletter />
          </UI.CardBody>
        </UI.Card>
      </UI.VStack>
    </Fragment>
  );
};
