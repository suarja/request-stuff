import { Entity } from "fp-ddd";
import { Either, right } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";

export interface UserOptions {
  name: string;
  email: string;
  currentStorage: number;
  maxStorage: number;
  subscription: "free" | "basic" | "mid";
}
export default class UserEntity extends Entity<UserOptions> {
  constructor(
    public readonly values: Either<Failure<UserOptions>, UserOptions>
  ) {
    super();
  }

  get name(): string {
    return this.getOrCrash().name;
  }
}

// // Usage
// const user = new User(
//   right({
//     name: "John Doe",
//     email: "john@example.com",
//     currentStorage: 0,
//     maxStorage: 1000,
//     subscription: "basic",
//   })
// );
