import { UI } from "@myth/ui";
import { auth } from "../../lib/firebase";

export const SignOutButton = ({ ...rest }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("signOut");
    } catch (error) {
      console.log("signOut", error);
    }
  };

  return (
    <UI.Button onClick={handleSignOut} {...rest}>
      Sign out
    </UI.Button>
  );
};
