import { Fragment } from "react";
import { UI, useDisclosure } from "@myth/ui";
import { SignInAllButtons } from "./SignInAllButtons";

export const SignInButton = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <UI.Button onClick={onOpen} {...rest}>
        Iniciar sesión
      </UI.Button>

      <SignInAllButtons onClose={onClose} isOpen={isOpen} />
    </Fragment>
  );
};
