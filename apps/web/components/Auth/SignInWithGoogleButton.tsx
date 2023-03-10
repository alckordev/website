import { UI, CIcon, icon } from "@myth/ui";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";

const provider = new GoogleAuthProvider();

export const SignInWithGoogleButton = ({ ...rest }) => {
  const handleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("signIn", response);
    } catch (error) {
      console.log("signIn", error);
    }
  };

  return (
    <UI.Button
      leftIcon={<CIcon icon={icon.riGoogleLine} size="lg" />}
      variant="outline"
      rounded="3xl"
      fontWeight="normal"
      onClick={handleSignIn}
      {...rest}
    >
      Iniciar sesión con Google
    </UI.Button>
  );
};
