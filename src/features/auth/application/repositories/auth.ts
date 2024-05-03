import { Either } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";
import { FirebaseAuth } from "../../infra/auth-firebase";
import { IAuth, IAuthOptions } from "./types";
import IDatabase from "@/common/interfaces/idatabase";
import { FirebaseDatabase } from "@/lib/firebase/firestore/firestore";

export class AuthRepository {
  private readonly _auth: IAuth;
  private readonly _db: IDatabase;

  constructor(options: IAuthOptions) {
    this._auth = options.auth;
    this._db = options.db;
  }

  createUserWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>> {
    return this._auth.createUserWithEmailAndPassword({ email, password });
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

export const authRepository = new AuthRepository({
  auth: FirebaseAuth,
  db: FirebaseDatabase,
});
