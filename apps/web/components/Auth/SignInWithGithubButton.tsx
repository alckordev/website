import { UI, CIcon, icon } from "@myth/ui";
// import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../lib/firebase";

// const provider = new GithubAuthProvider();

export const SignInWithGithubButton = () => {
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
      leftIcon={<CIcon icon={icon.riGithubLine} size="lg" />}
      variant="outline"
      rounded="3xl"
      fontWeight="normal"
      //   onClick={handleSignIn}
      isDisabled={true}
    >
      Iniciar sesión con Github
    </UI.Button>
  );
};
