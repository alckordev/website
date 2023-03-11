import { UI } from "@myth/ui";
import { SignInWithFacebookButton } from "./SignInWithFacebookButton";
import { SignInWithGithubButton } from "./SignInWithGithubButton";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";
import { SignInWithTwitterButton } from "./SignInWithTwitterButton";

export const SignInAllButtons = ({
  isOpen,
  onClose,
  ...rest
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <UI.Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered {...rest}>
      <UI.ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
      <UI.ModalContent>
        <UI.ModalCloseButton />
        <UI.ModalBody py={20} textAlign="center">
          <UI.Heading as="h2" fontSize="lg">
            Bienvenido de nuevo.
          </UI.Heading>
          <UI.VStack my={16} spacing={4}>
            <SignInWithGoogleButton callback={onClose} />
            <SignInWithFacebookButton isDisabled={true} />
            <SignInWithGithubButton callback={onClose} />
            <SignInWithTwitterButton isDisabled={true} />
          </UI.VStack>
          <UI.Text fontSize="sm">
            Haga clic en "Iniciar sesión" para aceptar los Términos de servicio
            de Medium y reconocer que la Política de privacidad de Medium se
            aplica a usted.
          </UI.Text>
        </UI.ModalBody>
      </UI.ModalContent>
    </UI.Modal>
  );
};
