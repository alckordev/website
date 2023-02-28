import NextLink from "next/link";
import { UI } from "@myth/ui";
import tags from "../data/tags";
import { Newsletter } from "./Newsletter";

export const Aside = ({ isBlogTemplate }: { isBlogTemplate: boolean }) => {
  return (
    <UI.VStack
      // divider={<UI.StackDivider borderColor="gray.700" />}
      spacing={4}
    >
      <UI.Card variant={isBlogTemplate ? "elevated" : "outline"}>
        <UI.CardHeader>
          <UI.Flex gap={4} alignItems="center" flexWrap="wrap">
            <UI.Avatar
              name="Francisco Luis Rios Vega"
              src="assets/avatar.jpg"
            />
            <UI.Box>
              <UI.Heading size="sm">Francisco</UI.Heading>
              <UI.Text>Fullstack Developer</UI.Text>
            </UI.Box>
          </UI.Flex>
        </UI.CardHeader>
        <UI.CardBody>
          <UI.Text>
            Ingeniero de sistemas de profesión, especializado en el desarrollo
            de proyectos de software con más de 10 años de experiencia.
          </UI.Text>
        </UI.CardBody>
      </UI.Card>
      <UI.Card variant={isBlogTemplate ? "elevated" : "outline"}>
        <UI.CardHeader>
          <UI.Heading as="h2" fontSize="lg">
            Tags
          </UI.Heading>
        </UI.CardHeader>
        <UI.CardBody>
          <UI.Flex flexWrap="wrap" gap={2}>
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
          </UI.Flex>
        </UI.CardBody>
      </UI.Card>
      <UI.Card variant={isBlogTemplate ? "elevated" : "outline"}>
        <UI.CardHeader>
          <UI.Heading as="h2" fontSize="lg">
            ¡Suscríbete ahora!
          </UI.Heading>
        </UI.CardHeader>
        <UI.CardBody>
          <UI.Text mb={6}>
            <UI.Highlight query="¡Libre de Spam!" styles={{ bg: "orange.100" }}>
              Recibirás artículos sobre programación y novedades en las que vaya
              trabajando. ¡Libre de Spam!
            </UI.Highlight>
          </UI.Text>
          <Newsletter />
        </UI.CardBody>
      </UI.Card>
    </UI.VStack>
  );
};
