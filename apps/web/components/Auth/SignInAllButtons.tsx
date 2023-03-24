import NextLink from "next/link";
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
            <SignInWithFacebookButton callback={onClose} />
            <SignInWithGithubButton callback={onClose} />
            <SignInWithTwitterButton isDisabled={true} />
          </UI.VStack>
          <UI.Text fontSize="sm">
            Al hacer clic en &quot;Iniciar sesión&quot;, confirmas que estás de
            acuerdo con nuestros{" "}
            <UI.Link as={NextLink} href="/terms-and-conditions">
              términos y condiciones
            </UI.Link>
            , así como con nuestra{" "}
            <UI.Link as={NextLink} href="/privacy-policy">
              política de privacidad
            </UI.Link>
            .
          </UI.Text>
        </UI.ModalBody>
      </UI.ModalContent>
    </UI.Modal>
  );
};
