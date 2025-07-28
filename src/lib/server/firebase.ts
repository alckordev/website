import "server-only";
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

class FirebaseServer {
  private client: App;

  constructor() {
    this.client = getApps().length
      ? initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        })
      : getApps()[0];
  }

  get instance() {
    return this.client;
  }

  auth() {
    return getAuth(this.client);
  }
}

const firebaseServer = new FirebaseServer();
export default firebaseServer;
