import { Either } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";
import { authFirebase } from "../../infra/auth-firebase";
import { IAuth } from "./types";

export class AuthRepository {
  private readonly _auth: IAuth;

  constructor(auth: IAuth) {
    this._auth = auth;
  }

  async signInWithMailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>> {
    return this._auth.signIn({
      email,
      password,
    });
  }
  async signOut() {
    return this._auth.signOut();
  }
}

export const authRepository = new AuthRepository(authFirebase);
