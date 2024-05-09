import IServerDatabase from "@/common/interfaces/Iserver-database";
import { DocumentData } from "firebase/firestore";
import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";
import { inject, injectable } from "tsyringe";

export interface ServerRepositoryOptions {
  readonly database: IServerDatabase;
}
@injectable()
export default class ServerRepository {
  private readonly _options: ServerRepositoryOptions;
  constructor(
    @inject("serverRepositoryOptions")
    serverRepositoryOptions: ServerRepositoryOptions
  ) {
    this._options = serverRepositoryOptions;
  }

  async getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    return this._options.database.getDocument("users", userId);
  }
}
