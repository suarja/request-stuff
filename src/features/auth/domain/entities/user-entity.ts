import { Entity } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";
import { UserInfra } from "../types/user";
import { userOptionsSchema } from "../types/user-schema";
import { ErrorMessage } from "@/common/interfaces/error";

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

  canUploadFile({ file }: { file: File }): {
    canUpload: boolean;
    message: ErrorMessage;
    additionalInfo?: string;
  } {
    //~Check if this is valid
    if (!this.isValid()) {
      return { canUpload: false, message: "User is not valid" };
    }
    const user = this.getOrCrash();
    const fileSizeInMb = file.size / 1024 / 1024;
    if (user.currentStorage + fileSizeInMb > user.maxStorage) {
      return {
        canUpload: false,
        message: "File size is greater than user's storage capacity",
        additionalInfo: `User's storage capacity is ${user.maxStorage} MB`,
      };
    }
    return { canUpload: true, message: "No error" };
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
