import firebase from "@/lib/client/firebase";
import { onAuthStateChanged, signInWithCustomToken, User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useSyncSession() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen to auth state
    const unsubscribe = onAuthStateChanged(firebase.auth(), (u) => {
      setUser(u);
      setInitializing(false);
    });

    // Try to sync session if no user yet
    if (!firebase.auth().currentUser) {
      fetch("/api/auth/sync-session", { credentials: "include" })
        .then(async (res) => {
          const { token } = await res.json();
          if (token) {
            await signInWithCustomToken(firebase.auth(), token);
          }
        })
        .catch((e) => {
          console.warn("session sync failed", e);
        });
    }

    return () => unsubscribe();
  }, []);

  return { user, initializing };
}
