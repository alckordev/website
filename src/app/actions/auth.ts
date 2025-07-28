import "server-only";
import server from "@/lib/server/firebase";
import { cookies } from "next/headers";

const COOKIE_NAME = "__session";
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax" as const,
};

export async function createSession(idToken: string) {
  const cookieStore = await cookies();

  const decoded = await server.auth().verifyIdToken(idToken);

  console.log(decoded);

  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await server.auth().createSessionCookie(idToken, {
    expiresIn,
  });

  cookieStore.set(COOKIE_NAME, sessionCookie, {
    ...COOKIE_OPTS,
    maxAge: expiresIn / 1000,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "");
}
