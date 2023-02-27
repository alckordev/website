import { UI } from "@myth/ui";

export const Newsletter = () => {
  return (
    <UI.Box as="form" onSubmit={() => console.log("submit")}>
      <UI.Heading as="h2" fontSize="lg" mb={4}>
        ¡Suscríbete ahora!
      </UI.Heading>
      <UI.Text mb={6}>
        <UI.Highlight query="¡Libre de Spam!" styles={{ bg: "orange.100" }}>
          Recibirás artículos sobre programación y novedades en las que vaya
          trabajando. ¡Libre de Spam!
        </UI.Highlight>
      </UI.Text>
      <UI.FormControl isInvalid={true}>
        <UI.Input type="email" placeholder="example@gmail.com" />
        <UI.FormErrorMessage>Jeez! You're not a fan 😱</UI.FormErrorMessage>
      </UI.FormControl>
      <UI.Button
        type="submit"
        w="100%"
        mt={4}
        colorScheme="purple"
        isLoading={false}
      >
        Suscribirme
      </UI.Button>
    </UI.Box>
  );
};
