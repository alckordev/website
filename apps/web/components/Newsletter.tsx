import { UI } from "@myth/ui";

export const Newsletter = () => {
  return (
    <UI.Box as="form" onSubmit={() => console.log("submit")}>
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
