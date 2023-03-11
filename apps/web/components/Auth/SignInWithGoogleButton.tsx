import { useState } from "react";
import { UI, CIcon, icon } from "@myth/ui";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";

const provider = new GoogleAuthProvider();

export const SignInWithGoogleButton = ({
  callback,
  ...rest
}: {
  callback?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      if (callback) callback();
    } catch (err) {
      console.log("signIn", err);
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
