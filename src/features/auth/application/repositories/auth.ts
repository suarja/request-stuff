import { authFirebase } from "../../infra/auth-firebase";

export class IAuth {
  async signIn() {}
  async signOut() {}
}

export class AuthRepository {
  private readonly _auth: IAuth;

  constructor(auth: IAuth) {
    this._auth = auth;
  }

  async signIn() {
    this._auth.signIn();
  }
  async signOut() {
    this._auth.signOut();
  }
}

export const authRepository = new AuthRepository(authFirebase);
