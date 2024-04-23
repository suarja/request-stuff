import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

export default async function signOutUser() {
  return await signOut(auth);
}
