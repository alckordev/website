import { useState } from "react";
import { UI, CIcon, icon } from "@myth/ui";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";

const provider = new GithubAuthProvider();

export const SignInWithGithubButton = ({
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
      leftIcon={<CIcon icon={icon.riGithubLine} size="lg" />}
      variant="outline"
      rounded="3xl"
      fontWeight="normal"
      onClick={handleSignIn}
      isLoading={isLoading}
      {...rest}
    >
      Iniciar sesión con Github
    </UI.Button>
  );
};
