import { UI, CIcon, icon } from "@myth/ui";
// import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../lib/firebase";

// const provider = new FacebookAuthProvider();

export const SignInWithFacebookButton = () => {
  //   const handleSignIn = async () => {
  //     try {
  //       const response = await signInWithPopup(auth, provider);
  //       console.log("signIn", response);
  //     } catch (error) {
  //       console.log("signIn", error);
  //     }
  //   };

  return (
    <UI.Button
      leftIcon={<CIcon icon={icon.riFacebookLine} size="lg" />}
      variant="outline"
      rounded="3xl"
      fontWeight="normal"
      //   onClick={handleSignIn}
      isDisabled={true}
    >
      Iniciar sesión con Facebook
    </UI.Button>
  );
};
