import { inject, injectable } from "tsyringe";
import ServerRepository from "../repositories/server-repository";
import { isLeft } from "fp-ts/lib/Either";
import UserDto from "@/features/auth/infra/dto's/user-dto";
import UserEntity from "@/features/auth/domain/entities/user-entity";

export interface ServerUsecasesOptions {
  serverRepository: ServerRepository;
}

@injectable()
export default class ServerUsecases {
  private readonly _serverRepository: ServerRepository;

  constructor(@inject("serverRepository") serverRepository: ServerRepository) {
    this._serverRepository = serverRepository;
  }

  async getUser({ userId }: { userId: string }): Promise<{
    error: boolean;
    message: string;
    user: UserEntity | null;
  }> {
    const eitherUserInfra = await this._serverRepository.getUser({
      userId,
    });

    if (isLeft(eitherUserInfra)) {
      console.log({ eitherUserInfra });
      return {
        error: true,
        message: eitherUserInfra.left.message,
        user: null,
      };
    }
    const userInfra = eitherUserInfra.right;
    const userDto = new UserDto();
    const eitherUser = userDto.toDomain({ data: userInfra });
    if (isLeft(eitherUser)) {
      return {
        error: true,
        message: eitherUser.left.message,
        user: null,
      };
    }
    const user = eitherUser.right;

    return {
      error: false,
      message: "",
      user,
    };
  }
}
