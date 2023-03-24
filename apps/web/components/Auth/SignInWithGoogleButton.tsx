import { useState } from "react";
import { UI, CIcon, icon, useToast } from "@myth/ui";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../lib/firebase";

const provider = new GoogleAuthProvider();

export const SignInWithGoogleButton = ({
  callback,
  ...rest
}: {
  callback?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast({ position: "top" });

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithRedirect(auth, provider);
      if (callback) callback();
    } catch (error) {
      console.log(`Catch error: ${error}`);
      toast({
        description: "¡Ups! Algo salió mal. 😭",
        status: "error",
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <UI.Button
      leftIcon={<CIcon icon={icon.riGoogleLine} size="lg" />}
      variant="outline"
      rounded="3xl"
      fontWeight="normal"
      onClick={handleSignIn}
      isLoading={isLoading}
      {...rest}
    >
      Iniciar sesión con Google
    </UI.Button>
  );
};
