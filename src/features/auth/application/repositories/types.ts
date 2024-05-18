import IDatabase from "@/common/interfaces/idatabase";
import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";
import { UserInfra as UserInfra } from "../../domain/types/user";
import { User } from "firebase/auth";

export interface IAuthOptions {
  auth: IAuth;
  db: IDatabase;
}

export abstract class IAuth {
  abstract getAuthUser(): Promise<Either<Failure<string>, User>>;
  abstract getAuthUserToken({
    user,
  }: {
    user: User;
  }): Promise<Either<Failure<string>, string>>;
  abstract createUserWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, UserInfra>>;
  abstract signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>>;
  abstract signOut(): Promise<void>;
}
