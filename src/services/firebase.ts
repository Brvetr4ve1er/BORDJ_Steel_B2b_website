import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase-config";

let firebaseApp: FirebaseApp;

/**
 * Initializes and returns the Firebase app instance, ensuring it's only created once.
 * @returns {FirebaseApp} The initialized Firebase app.
 */
export function getFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
  return firebaseApp;
}
