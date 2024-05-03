import { Entity } from "fp-ddd";
import { Either, right } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";
import { UserInfra } from "../types/user";
import { userOptionsSchema } from "../types/user-schema";

export interface UserOptions extends UserInfra {
  currentStorage: number;
  maxStorage: number;
  subscription: "free" | "basic" | "mid";
}
export default class UserEntity extends Entity<UserOptions> {
  public values: Either<Failure<UserOptions>, UserOptions>;
  private constructor(values: Either<Failure<UserOptions>, UserOptions>) {
    super();
    this.values = values;
  }

  static create(data: any): UserEntity {
    return new UserEntity(data);
  }
  get name(): string | null {
    return this.getOrCrash().displayName;
  }

  validateValues(): boolean {
    if (this.isValid()) {
      return userOptionsSchema.safeParse(this.getOrCrash()).success;
    } else {
      return false;
    }
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
