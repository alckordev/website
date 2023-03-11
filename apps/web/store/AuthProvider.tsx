import { createContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

interface User {
  accessToken: string;
  displayName: string;
  email: string;
  isAnonymous: boolean;
  photoURL: string;
  uid: string;
}

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  });

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};
