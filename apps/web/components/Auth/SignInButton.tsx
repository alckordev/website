import { useContext } from "react";
import { UI } from "@myth/ui";
import { AuthContext } from "../../store/AuthContextProvider";

export const SignInButton = ({ ...rest }) => {
  const { onOpenSignIn } = useContext(AuthContext);

  return (
    <UI.Button onClick={onOpenSignIn} {...rest}>
      Iniciar sesión
    </UI.Button>
  );
};
