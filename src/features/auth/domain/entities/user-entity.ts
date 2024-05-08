import { Entity } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";
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
  private constructor(props: UserOptions) {
    super();
    this.values = this.validate(props);
  }

  static create(options: UserOptions): UserEntity {
    return new UserEntity(options);
  }
  get name(): string | null {
    return this.getOrCrash().displayName;
  }

  validate(options: UserOptions): Either<Failure<UserOptions>, UserOptions> {
    const isValid = userOptionsSchema.safeParse(options);
    if (isValid.success) {
      return right(options);
    } else {
      return left(
        new Failure({
          invalidValue: options,
          message: isValid.error.errors[0].message,
        })
      );
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
