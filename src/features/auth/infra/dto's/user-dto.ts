import { DTO } from "@/common/interfaces/dto";
import UserEntity, { UserOptions } from "../../domain/entities/user-entity";
import { UserInfra } from "../../domain/types/user";
import { Either, left, right } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";
import {
  userInfraSchema,
  userOptionsSchema,
} from "../../domain/types/user-schema";

export default class UserDto implements DTO<UserEntity, UserInfra> {
  fromDomain({ data }: { data: UserEntity }): UserInfra {
    throw new Error("Method not implemented.");
  }
  toDomain({ data }: { data: unknown }): Either<Failure<string>, UserEntity> {
    try {
      const isUser = userOptionsSchema.safeParse(data);
      if (!isUser.success) {
        return left(
          Failure.invalidValue({
            invalidValue: data,
            message: "User values do not math user interface",
          })
        );
      }
      return right(UserEntity.create(isUser.data));
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: data,
          message: "User values do not math user interface",
        })
      );
    }
  }
}
