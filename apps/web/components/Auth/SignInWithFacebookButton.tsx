import { useState } from "react";
import { UI, CIcon, icon } from "@myth/ui";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";

const provider = new FacebookAuthProvider();

export const SignInWithFacebookButton = ({
  callback,
  ...rest
}: {
  callback: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      if (callback) callback();
    } catch (error) {
      console.log("signIn", error);
    }
    setIsLoading(false);
  };

  return (
    <UI.Button
      leftIcon={<CIcon icon={icon.riFacebookLine} size="lg" />}
      variant="outline"
      rounded="3xl"
      fontWeight="normal"
      onClick={handleSignIn}
      isLoading={isLoading}
      {...rest}
    >
      Iniciar sesión con Facebook
    </UI.Button>
  );
};
