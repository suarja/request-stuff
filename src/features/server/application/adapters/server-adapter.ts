import { inject, injectable } from "tsyringe";
import ServerUsecases from "../usecases/server-usecases";
import UserEntity from "@/features/auth/domain/entities/user-entity";

@injectable()
export default class ServerAdapter {
  private readonly _usecases: ServerUsecases;

  constructor(@inject("serverUsecases") serverUsecases: ServerUsecases) {
    this._usecases = serverUsecases;
  }

  async getUser({ userId }: { userId: string }): Promise<{
    returnOptions: { error: boolean; message: string; status: number };
    user: UserEntity | null;
  }> {
    const result = await this._usecases.getUser({ userId });
    if (result.error) {
      return {
        returnOptions: {
          error: true,
          message: result.message,
          status: 200,
        },
        user: null,
      };
    }
    return {
      returnOptions: { error: false, message: "", status: 200 },
      user: result.user,
    };
  }
}
