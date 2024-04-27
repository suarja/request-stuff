import { BASE_URL } from "@/common/constants";
import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

export default async function signOutUser() {
  await signOut(auth);

  const response = await fetch(`${BASE_URL}/api/logout`, {
    method: "POST",
  });

  if (response.ok) {
    console.log("User is signed out");
  }
}
