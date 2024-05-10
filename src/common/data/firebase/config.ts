// Import the functions you need from the SDKs you need
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function shouldConnectFirestoreEmulator(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getFirestoreEmulatorHost() {
  return process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST ?? "localhost";
}
export function getFirestoreEmulatorPort() {
  return Number(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT) ?? 8080;
}
// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  
export const FirestoreDB = getFirestore(firebase_app);
if (shouldConnectFirestoreEmulator()) {
  connectFirestoreEmulator(
    FirestoreDB,
    getFirestoreEmulatorHost(),
    getFirestoreEmulatorPort()
  );
}

export default firebase_app;
