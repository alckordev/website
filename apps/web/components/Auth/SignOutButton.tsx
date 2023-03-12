import { useState } from "react";
import { UI, useToast } from "@myth/ui";
import { auth } from "../../lib/firebase";

export const SignOutButton = ({ ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast({ position: "top" });

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();

      toast({
        description: "¡Hasta la próxima! Esperamos verte pronto de nuevo.",
      });
    } catch (error) {
      toast({
        description: "¡Ups! Algo salió mal. 😭",
        status: "error",
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <UI.Button onClick={handleSignOut} isLoading={isLoading} {...rest}>
      Cerrar sesión
    </UI.Button>
  );
};
