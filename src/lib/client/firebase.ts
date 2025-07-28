import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

class FirebaseClient {
  private client: FirebaseApp;

  constructor() {
    this.client = getApps().length
      ? initializeApp({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        })
      : getApps()[0];
  }

  get instance() {
    return this.client;
  }

  auth() {
    return getAuth(this.client);
  }

  database() {
    return getDatabase(this.client);
  }
}

const firebaseClient = new FirebaseClient();
export default firebaseClient;
