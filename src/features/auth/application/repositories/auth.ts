import { Either, left, right } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";
import { FirebaseAuth } from "../../infra/auth-firebase";
import { IAuth, IAuthOptions } from "./types";
import IDatabase from "@/common/interfaces/idatabase";
import { FirebaseDatabase } from "@/common/data/firebase/firestore/firestore";
import { UserInfra } from "../../domain/types/user";
import UserEntity, { UserOptions } from "../../domain/entities/user-entity";
import UserDto from "../../infra/dto's/user-dto";

export class AuthRepository {
  private readonly _auth: IAuth;
  private readonly _db: IDatabase;

  constructor(options: IAuthOptions) {
    this._auth = options.auth;
    this._db = options.db;
  }

  async createUserWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, UserInfra>> {
    return this._auth.createUserWithEmailAndPassword({ email, password });
  }

  async saveUser({ user }: { user: UserOptions }) {
    return this._db.addDocument("users", user, user.id);
  }

  async getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, UserEntity>> {
    const eitherUser = await this._db.getDocument("users", userId);
    if (!eitherUser) {
      return left(
        Failure.invalidValue({
          invalidValue: eitherUser,
          message: "Could not retrieve user from DB",
        })
      );
    }
    const userDto = new UserDto();
    return userDto.toDomain({ data: eitherUser });
  }
  async updateUser({
    userId,
    user,
  }: {
    userId: string;
    user: UserOptions;
  }): Promise<Either<Failure<string>, void>> {
    await this._db.updateDocument("users", userId, user);

    return right(undefined);
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
