import { Failure } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";

export abstract class IAuth {
  abstract signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>>;
  abstract signOut(): Promise<void>;
}
