import { Auth, getAuth } from "firebase/auth";
import { IAuth } from "../application/repositories/auth";
import firebase_app from "@/lib/firebase/config";

class AuthFirebase extends IAuth {
  private readonly _authProvider: Auth;
  constructor(authProvider: Auth) {
    super();
    this._authProvider = authProvider;
  }
  signIn(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  signOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const authFirebase = new AuthFirebase(getAuth(firebase_app));
