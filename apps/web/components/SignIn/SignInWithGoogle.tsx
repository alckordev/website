import { UI } from "@myth/ui";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const SignInWithGoogle = () => {
  const signIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("signIn", response);
    } catch (error) {
      console.log("signIn", error);
    }
  };

  return <UI.Button onClick={signIn}>Sign in with Google</UI.Button>;
};
