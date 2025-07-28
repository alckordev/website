// (dal) data access layer
import "server-only";
import { cookies } from "next/headers";
import server from "./firebase";
import { User } from "@/type";

// export const verifySession = async () => {};

export const getUser = async (): Promise<User | null> => {
  try {
    const cookie = (await cookies()).get("__session")?.value;

    if (!cookie) return null;

    const decoded = await server.auth().verifySessionCookie(cookie, true);

    return {
      aud: decoded.aud,
      uid: decoded.uid,
      sub: decoded.sub,
      authTime: decoded.auth_time,
      email: decoded.email,
      emailVerified: decoded.email_verified,
      name: decoded.name,
      picture: decoded.picture,
      exp: decoded.exp,
      iat: decoded.iat,
      iss: decoded.iss,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
