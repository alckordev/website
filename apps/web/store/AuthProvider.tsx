import { createContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

interface User {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  photoURL: string;
  uid: string;
}

export const AuthContext = createContext<{
  currentUser: User | null;
  isOpenSignIn: boolean;
  onOpenSignIn: () => void;
  onCloseSignIn: () => void;
}>({
  currentUser: null,
  isOpenSignIn: false,
  onOpenSignIn: () => {},
  onCloseSignIn: () => {},
});

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<any | null>(null);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);

  const onOpenSignIn = () => setIsOpenSignIn(true);

  const onCloseSignIn = () => setIsOpenSignIn(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  });

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        isOpenSignIn: isOpenSignIn,
        onOpenSignIn: onOpenSignIn,
        onCloseSignIn: onCloseSignIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
