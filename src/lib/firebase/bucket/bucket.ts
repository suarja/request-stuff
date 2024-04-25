import firebase_app from "../config";
import { getStorage } from "firebase/storage";

export const BucktStorage = getStorage(firebase_app);
