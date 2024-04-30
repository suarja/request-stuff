import { Either } from "fp-ts/lib/Either";
import { authFirebase } from "../../infra/auth-firebase";
import { Failure } from "fp-ddd";

export abstract class IAuth {
  abstract signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>>;
  async signOut() {}
}

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
    this._auth.signOut();
  }
}

export const authRepository = new AuthRepository(authFirebase);
