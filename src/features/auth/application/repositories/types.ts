import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";

export abstract class IAuth {
  abstract createUserWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>>;
  abstract signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>>;
  abstract signOut(): Promise<void>;
}

