import { UI, CIcon, icon } from "@myth/ui";
// import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../lib/firebase";

// const provider = new TwitterAuthProvider();

export const SignInWithTwitterButton = ({ ...rest }) => {
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
      leftIcon={<CIcon icon={icon.riTwitterLine} size="lg" />}
      variant="outline"
      rounded="3xl"
      fontWeight="normal"
      // onClick={handleSignIn}
      // isDisabled={true}
      {...rest}
    >
      Iniciar sesión con Twitter
    </UI.Button>
  );
};
