import { getFirestore } from "firebase/firestore";
import firebase_app from "../config";

export const FirestoreDB = getFirestore(firebase_app);
