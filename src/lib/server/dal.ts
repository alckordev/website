// (dal) data access layer
import "server-only";
import { cookies } from "next/headers";
import server from "./firebase";
import { Provider, User } from "@/type";

// export const verifySession = async () => {};

export const getUser = async (): Promise<User | null> => {
  try {
    const cookie = (await cookies()).get("__session")?.value;
    if (!cookie) return null;

    const decodedClaims = await server.auth().verifySessionCookie(cookie, true);
    const uid = decodedClaims.uid;

    if (!uid) return null;

    const record = await server.auth().getUser(uid);

    return {
      uid: record.uid,
      email: decodedClaims.email ?? record.email ?? "",
      emailVerified:
        decodedClaims.email_verified ?? record.emailVerified ?? false,
      displayName: record.displayName ?? "",
      picture: record.photoURL ?? "",
      providerData: record.providerData.map((p) => ({
        uid: p.uid,
        email: p.email ?? "",
        providerId: p.providerId as Provider,
      })),
    };
  } catch (err) {
    console.error("getUser error:", err);
    return null;
  }
};
