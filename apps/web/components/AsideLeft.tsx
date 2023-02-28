import { UI, useColorModeValue } from "@myth/ui";

export const AsideLeft = () => {
  return (
    <UI.VStack spacing={10}>
      <UI.Card variant="outline">
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
    </UI.VStack>
  );
};
